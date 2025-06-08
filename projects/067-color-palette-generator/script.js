document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const baseColorInput = document.getElementById('base-color');
  const schemeSelect = document.getElementById('scheme');
  const paletteContainer = document.getElementById('palette');

  generateBtn.addEventListener('click', generatePalette);
  baseColorInput.addEventListener('input', generatePalette);

  function generatePalette() {
    const baseColor = baseColorInput.value.slice(1); 
    const scheme = schemeSelect.value;
    let colors = [];

    switch (scheme) {
      case 'monochromatic':
        colors = generateMonochromatic(baseColor);
        break;
      case 'analogous':
        colors = generateAnalogous(baseColor);
        break;
      case 'complementary':
        colors = generateComplementary(baseColor);
        break;
      case 'triadic':
        colors = generateTriadic(baseColor);
        break;
      case 'tetradic':
        colors = generateTetradic(baseColor);
        break;
      default:
        colors = [baseColor];
    }

    displayPalette(colors);
  }

  function displayPalette(colors) {
    paletteContainer.innerHTML = '';
    colors.forEach(color => {
      const colorBox = document.createElement('div');
      colorBox.className = 'color-box';
      colorBox.style.backgroundColor = `#${color}`;

      const colorValue = document.createElement('div');
      colorValue.className = 'color-value';
      colorValue.textContent = `#${color}`;
      colorValue.addEventListener('click', () => {
        navigator.clipboard.writeText(`#${color}`);
        colorValue.textContent = 'Copied!';
        setTimeout(() => {
          colorValue.textContent = `#${color}`;
        }, 1000);
      });

      colorBox.appendChild(colorValue);
      paletteContainer.appendChild(colorBox);
    });
  }

  function generateMonochromatic(baseColor) {
    const hsl = hexToHSL(baseColor);
    const colors = [];
    for (let i = 0; i < 5; i++) {
      const newHsl = { ...hsl };
      newHsl.l = Math.min(95, Math.max(5, hsl.l + (i - 2) * 10));
      colors.push(hslToHex(newHsl));
    }
    return colors;
  }

  function generateAnalogous(baseColor) {
    const hsl = hexToHSL(baseColor);
    const colors = [];
    for (let i = -2; i <= 2; i++) {
      const newHsl = { ...hsl };
      newHsl.h = (newHsl.h + i * 30 + 360) % 360;
      colors.push(hslToHex(newHsl));
    }
    return colors;
  }

  function generateComplementary(baseColor) {
    const hsl = hexToHSL(baseColor);
    const colors = [];
    colors.push(hslToHex(hsl));
    const compHsl = { ...hsl, h: (hsl.h + 180) % 360 };
    colors.push(hslToHex(compHsl));
    return colors;
  }

  function generateTriadic(baseColor) {
    const hsl = hexToHSL(baseColor);
    const colors = [];
    colors.push(hslToHex(hsl));
    colors.push(hslToHex({ ...hsl, h: (hsl.h + 120) % 360 }));
    colors.push(hslToHex({ ...hsl, h: (hsl.h + 240) % 360 }));
    return colors;
  }

  function generateTetradic(baseColor) {
    const hsl = hexToHSL(baseColor);
    const colors = [];
    colors.push(hslToHex(hsl));
    colors.push(hslToHex({ ...hsl, h: (hsl.h + 90) % 360 }));
    colors.push(hslToHex({ ...hsl, h: (hsl.h + 180) % 360 }));
    colors.push(hslToHex({ ...hsl, h: (hsl.h + 270) % 360 }));
    return colors;
  }

  function hexToHSL(hex) {
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function hslToHex(hsl) {
    let { h, s, l } = hsl;
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  generatePalette();
});