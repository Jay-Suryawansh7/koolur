import { render, renderPlain } from './json';
import { red, green, blue, black, white } from '../index.js';

describe('JSON plugin', () => {
  describe('render()', () => {
    it('should return structured JSON output', () => {
      const styled = red('hello');
      const output = render(styled.text, styled.color);
      
      expect(output.text).toBe('hello');
      expect(output.color.hex).toBe('#FF0000');
      expect(output.color.rgb).toEqual({ r: 255, g: 0, b: 0 });
      expect(output.color.hsl).toEqual({ h: 0, s: 100, l: 50 });
    });

    it('should handle green color', () => {
      const styled = green('world');
      const output = render(styled.text, styled.color);
      
      expect(output.color.hex).toBe('#008000');
      expect(output.color.rgb).toEqual({ r: 0, g: 128, b: 0 });
    });

    it('should handle blue color', () => {
      const styled = blue('test');
      const output = render(styled.text, styled.color);
      
      expect(output.color.hex).toBe('#0000FF');
    });

    it('should handle black color', () => {
      const styled = black('text');
      const output = render(styled.text, styled.color);
      
      expect(output.color.hex).toBe('#000000');
      expect(output.color.rgb).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should handle white color', () => {
      const styled = white('text');
      const output = render(styled.text, styled.color);
      
      expect(output.color.hex).toBe('#FFFFFF');
    });

    it('should handle empty string', () => {
      const styled = red('');
      const output = render(styled.text, styled.color);
      
      expect(output.text).toBe('');
      expect(output.color.hex).toBe('#FF0000');
    });
  });

  describe('renderPlain()', () => {
    it('should return just the text', () => {
      const styled = red('hello');
      const output = renderPlain(styled.text, styled.color);
      
      expect(output).toBe('hello');
    });

    it('should ignore color', () => {
      const styled = green('world');
      const output = renderPlain(styled.text, styled.color);
      
      expect(output).toBe('world');
    });
  });
});