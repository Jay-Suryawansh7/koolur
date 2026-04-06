import { render, createChalkStyle } from './browser';
import { red, green, blue, black, white } from '../index.js';

describe('Browser plugin', () => {
  describe('render()', () => {
    it('should render text with inline CSS color', () => {
      const styled = red('hello');
      const output = render(styled.text, styled.color);
      expect(output).toContain('<span style="color: #FF0000">');
      expect(output).toContain('</span>');
      expect(output).toContain('hello');
    });

    it('should render green color', () => {
      const styled = green('world');
      const output = render(styled.text, styled.color);
      expect(output).toContain('color: #008000');
    });

    it('should render blue color', () => {
      const styled = blue('test');
      const output = render(styled.text, styled.color);
      expect(output).toContain('color: #0000FF');
    });

    it('should handle black color', () => {
      const styled = black('text');
      const output = render(styled.text, styled.color);
      expect(output).toContain('color: #000000');
    });

    it('should handle white color', () => {
      const styled = white('text');
      const output = render(styled.text, styled.color);
      expect(output).toContain('color: #FFFFFF');
    });

    it('should escape HTML in text', () => {
      const styled = red('<script>alert("xss")</script>');
      const output = render(styled.text, styled.color);
      expect(output).toContain('&lt;script&gt;');
      expect(output).not.toContain('<script>');
    });

    it('should handle empty string', () => {
      const styled = red('');
      const output = render(styled.text, styled.color);
      expect(output).toContain('<span style="color: #FF0000"></span>');
    });
  });

  describe('createChalkStyle()', () => {
    it('should return a function that wraps text', () => {
      const styleFn = createChalkStyle(red('').color);
      const output = styleFn('hello');
      expect(output).toContain('hello');
      expect(output).toContain('color: #FF0000');
    });
  });
});