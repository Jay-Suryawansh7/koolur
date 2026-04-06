import {
  Color,
  HslColor,
  red,
  green,
  blue,
  yellow,
  cyan,
  magenta,
  white,
  black,
  gray,
  grey,
  brightRed,
  brightGreen,
  brightBlue,
  brightYellow,
  brightCyan,
  brightMagenta,
  brightWhite,
  brightBlack,
  rgb,
  hex,
  hsl,
} from './index';

describe('Color class', () => {
  describe('constructor', () => {
    it('should create a color with valid RGB values', () => {
      const color = new Color(255, 128, 0);
      expect(color.toRgb()).toEqual({ r: 255, g: 128, b: 0 });
    });

    it('should clamp values to 0-255 range', () => {
      const color = new Color(300, -10, 128);
      expect(color.toRgb()).toEqual({ r: 255, g: 0, b: 128 });
    });

    it('should round decimal values', () => {
      const color = new Color(100.6, 100.4, 100.5);
      expect(color.toRgb()).toEqual({ r: 101, g: 100, b: 101 });
    });
  });

  describe('toHex()', () => {
    it('should convert black to #000000', () => {
      expect(black().color.toHex()).toBe('#000000');
    });

    it('should convert white to #FFFFFF', () => {
      expect(white().color.toHex()).toBe('#FFFFFF');
    });

    it('should convert red to #FF0000', () => {
      expect(red().color.toHex()).toBe('#FF0000');
    });

    it('should convert green to #008000', () => {
      expect(green().color.toHex()).toBe('#008000');
    });

    it('should convert blue to #0000FF', () => {
      expect(blue().color.toHex()).toBe('#0000FF');
    });

    it('should pad single digit hex values with zeros', () => {
      const color = new Color(1, 10, 100);
      expect(color.toHex()).toBe('#010A64');
    });
  });

  describe('toRgb()', () => {
    it('should return RGB object', () => {
      const color = new Color(100, 150, 200);
      expect(color.toRgb()).toEqual({ r: 100, g: 150, b: 200 });
    });

    it('should return a copy, not the original', () => {
      const color = new Color(100, 150, 200);
      const rgb = color.toRgb();
      rgb.r = 0;
      expect(color.toRgb().r).toBe(100);
    });
  });

  describe('toHsl()', () => {
    it('should convert black to HSL(0, 0%, 0%)', () => {
      const hsl = black().color.toHsl();
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(0);
      expect(hsl.l).toBe(0);
    });

    it('should convert white to HSL(0, 0%, 100%)', () => {
      const hsl = white().color.toHsl();
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(0);
      expect(hsl.l).toBe(100);
    });

    it('should convert red to HSL(0, 100%, 50%)', () => {
      const hsl = red().color.toHsl();
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
    });

    it('should convert green to HSL(120, 100%, 25%)', () => {
      const hsl = green().color.toHsl();
      expect(hsl.h).toBe(120);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(25);
    });

    it('should convert blue to HSL(240, 100%, 50%)', () => {
      const hsl = blue().color.toHsl();
      expect(hsl.h).toBe(240);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
    });
  });

  describe('toString()', () => {
    it('should return hex string', () => {
      const color = new Color(255, 0, 0);
      expect(color.toString()).toBe('#FF0000');
    });
  });
});

describe('Named color functions', () => {
  it('red should create red color', () => {
    const styled = red('hello');
    expect(styled.color.toHex()).toBe('#FF0000');
  });

  it('green should create green color', () => {
    const styled = green('hello');
    expect(styled.color.toHex()).toBe('#008000');
  });

  it('blue should create blue color', () => {
    const styled = blue('hello');
    expect(styled.color.toHex()).toBe('#0000FF');
  });

  it('yellow should create yellow color', () => {
    const styled = yellow('hello');
    expect(styled.color.toHex()).toBe('#FFFF00');
  });

  it('cyan should create cyan color', () => {
    const styled = cyan('hello');
    expect(styled.color.toHex()).toBe('#00FFFF');
  });

  it('magenta should create magenta color', () => {
    const styled = magenta('hello');
    expect(styled.color.toHex()).toBe('#FF00FF');
  });

  it('white should create white color', () => {
    const styled = white('hello');
    expect(styled.color.toHex()).toBe('#FFFFFF');
  });

  it('black should create black color', () => {
    const styled = black('hello');
    expect(styled.color.toHex()).toBe('#000000');
  });

  it('gray and grey should be equivalent', () => {
    expect(gray('test').color.toHex()).toBe(grey('test').color.toHex());
  });

  it('brightRed should create bright red', () => {
    const styled = brightRed('hello');
    expect(styled.color.toHex()).toBe('#FF0000');
  });

  it('brightGreen should create bright green', () => {
    const styled = brightGreen('hello');
    expect(styled.color.toHex()).toBe('#00FF00');
  });

  it('brightBlue should create bright blue', () => {
    const styled = brightBlue('hello');
    expect(styled.color.toHex()).toBe('#0000FF');
  });
});

describe('Factory functions', () => {
  describe('rgb()', () => {
    it('should create color from RGB values', () => {
      const color = rgb(100, 150, 200);
      expect(color.toRgb()).toEqual({ r: 100, g: 150, b: 200 });
    });
  });

  describe('hex()', () => {
    it('should parse 6-digit hex', () => {
      const color = hex('#FF5500');
      expect(color.toHex()).toBe('#FF5500');
    });

    it('should parse hex without hash', () => {
      const color = hex('FF5500');
      expect(color.toHex()).toBe('#FF5500');
    });

    it('should parse 3-digit hex', () => {
      const color = hex('#F50');
      expect(color.toHex()).toBe('#FF5500');
    });

    it('should parse lowercase hex', () => {
      const color = hex('#ff5500');
      expect(color.toHex()).toBe('#FF5500');
    });

    it('should throw on invalid hex', () => {
      expect(() => hex('invalid')).toThrow('Invalid hex color format');
    });

    it('should throw on too short hex', () => {
      expect(() => hex('#FF')).toThrow('Invalid hex color format');
    });
  });

  describe('hsl()', () => {
    it('should create color from HSL values', () => {
      const color = hsl(0, 100, 50);
      expect(color.toHex()).toBe('#FF0000');
    });

    it('should convert HSL(120, 100%, 50%) to green', () => {
      const color = hsl(120, 100, 50);
      expect(color.toHex()).toBe('#00FF00');
    });

    it('should convert HSL(240, 100%, 50%) to blue', () => {
      const color = hsl(240, 100, 50);
      expect(color.toHex()).toBe('#0000FF');
    });
  });
});

describe('HslColor class', () => {
  it('should create from HSL values', () => {
    const hslColor = new HslColor(120, 100, 50);
    expect(hslColor.toHex()).toBe('#00FF00');
  });

  it('should convert to RGB correctly', () => {
    const hslColor = new HslColor(0, 100, 50);
    expect(hslColor.toRgb()).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('should handle grayscale', () => {
    const hslColor = new HslColor(0, 0, 50);
    const rgb = hslColor.toRgb();
    expect(rgb.r).toBe(rgb.g);
    expect(rgb.g).toBe(rgb.b);
  });
});

describe('StylizedText class', () => {
  it('should store text and color', () => {
    const styled = red('hello');
    expect(styled.text).toBe('hello');
    expect(styled.color.toHex()).toBe('#FF0000');
  });

  it('should stringify to text', () => {
    const styled = red('hello');
    expect(styled.toString()).toBe('hello');
  });
});