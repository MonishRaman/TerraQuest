import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy.signal import find_peaks
import io
import base64

class TransitLightCurve:
    def __init__(self):
        pass
    def generate_light_curve(self, times, planet_radius, star_radius, period, t0, semi_major_axis, inclination=90):
        k = planet_radius / star_radius
        inc_rad = np.radians(inclination)
        u1, u2 = 0.3, 0.2
        
        # Create a simple transit model manually since pytransit is complex
        flux = np.ones_like(times)
        
        # Calculate transit times
        transit_times = np.arange(t0, times[-1] + period, period)
        
        for transit_time in transit_times:
            # Find points within transit duration
            transit_duration = period * np.arcsin(planet_radius / semi_major_axis) / np.pi
            transit_mask = np.abs(times - transit_time) < transit_duration / 2
            
            # Apply transit depth
            depth = (planet_radius / star_radius) ** 2
            flux[transit_mask] = 1 - depth
            
        return flux
    def add_noise(self, flux, noise_level=0.0005):
        noise = np.random.normal(0, noise_level, len(flux))
        return flux + noise
    def detect_transits(self, times, flux, threshold=0.995):
        inverted_flux = 1 - flux
        peaks, _ = find_peaks(inverted_flux, height=1-threshold, distance=50)
        return peaks
    def plot_light_curve(self, times, flux, planet_name="Exoplanet"):
        plt.figure(figsize=(12, 6))
        plt.plot(times, flux, 'b.', markersize=2, alpha=0.6, label='Observed Data')
        peaks = self.detect_transits(times, flux)
        if len(peaks) > 0:
            for peak in peaks:
                transit_window = 100
                start_idx = max(0, peak - transit_window)
                end_idx = min(len(times), peak + transit_window)
                plt.axvspan(times[start_idx], times[end_idx], alpha=0.2, color='red', label='Transit' if peak == peaks[0] else '')
            plt.plot(times[peaks], flux[peaks], 'rv', markersize=10, label='Transit Center', zorder=5)
        plt.xlabel('Time (days)', fontsize=12)
        plt.ylabel('Relative Brightness', fontsize=12)
        plt.title(f'Transit Light Curve - {planet_name}', fontsize=14, fontweight='bold')
        plt.grid(True, alpha=0.3)
        plt.legend(loc='upper right')
        plt.ylim([0.985, 1.005])
        buf = io.BytesIO()
        plt.savefig(buf, format='png', dpi=150, bbox_inches='tight')
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode()
        plt.close()
        return img_base64
    def calculate_transit_depth(self, flux):
        baseline = np.median(flux[flux > 0.998])
        min_flux = np.min(flux)
        depth = (baseline - min_flux) / baseline * 100
        return depth
    def generate_sample_transit(self, planet_name="Exoplanet-1"):
        times = np.linspace(0, 10, 2000)
        planet_radius = 1.0 * 71492 / 696000
        star_radius = 1.0
        period = 3.5
        t0 = 2.0
        semi_major_axis = 0.05 / 0.00465
        flux_clean = self.generate_light_curve(times, planet_radius, star_radius, period, t0, semi_major_axis, inclination=89.5)
        flux_noisy = self.add_noise(flux_clean)
        img_base64 = self.plot_light_curve(times, flux_noisy, planet_name)
        depth = self.calculate_transit_depth(flux_noisy)
        return {
            'image': img_base64,
            'depth': float(depth),
            'transits_detected': int(len(self.detect_transits(times, flux_noisy)))
        }
