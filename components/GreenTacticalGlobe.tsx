"use client";

import React from 'react';
import MilitaryMap from './TacticalGlobe3D';

export default function GreenTacticalGlobe({ width = 600, height = 600 }: { width?: number; height?: number }) {
  return (
    <div style={{ width: '100%', height: '100%', maxWidth: width, maxHeight: height, margin: '0 auto', position: 'relative' }}>
      <MilitaryMap
        interaction={{
          autoRotate: true,
          autoRotateSpeed: 7,
          rotateX: 0,
          rotateY: 15,
          rotateZ: 0,
          enableDrag: true,
          dragSensitivity: 0.4,
          glowColor: "#22c55e",
          glowIntensity: 0.7,
          showStars: true,
          showLabels: true,
        }}
        mapStyle={{
          oceanColor: "rgba(9, 18, 10, 0.95)",
          landFill: "#15803d",
          landStroke: "#4ade80",
          strokeWidth: 0.6,
          hoverColor: "#86efac",
          disabledColor: "#0f2912",
        }}
        grid={{
          show: true,
          color: "#4ade80",
          opacity: 0.25,
        }}
        tooltip={{
          show: true,
          background: "rgba(9, 18, 10, 0.92)",
          textColor: "#e7ece9",
          borderColor: "rgba(74, 222, 128, 0.4)",
        }}
        layout={{
          cornerRadius: 0,
          padding: 12,
          showBorder: false,
          borderColor: "transparent",
        }}
        markers={[
          { label: "America Node", description: "Environmental Intelligence Node", latitude: 38.8951, longitude: -77.0364, color: "#22c55e" },
          { label: "Europe Node", description: "Atmospheric Monitoring Hub", latitude: 48.8566, longitude: 2.3522, color: "#22c55e" },
          { label: "Asia-Pacific Node", description: "Blockchain MRV Core", latitude: 35.6762, longitude: 139.6503, color: "#22c55e" },
          { label: "South America Node", description: "Ecosystem Science Station", latitude: -15.7975, longitude: -47.8919, color: "#22c55e" },
        ]}
        countries={[
          { code: "USA", name: "United States", enabled: true },
          { code: "CAN", name: "Canada", enabled: true },
          { code: "BRA", name: "Brazil", enabled: true },
          { code: "GBR", name: "United Kingdom", enabled: true },
          { code: "FRA", name: "France", enabled: true },
          { code: "DEU", name: "Germany", enabled: true },
          { code: "IND", name: "India", enabled: true },
          { code: "CHN", name: "China", enabled: true },
          { code: "JPN", name: "Japan", enabled: true },
          { code: "AUS", name: "Australia", enabled: true },
        ]}
      />
    </div>
  );
}
