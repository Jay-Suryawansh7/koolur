import { render } from './terminal';
import { red, green, blue, black, white, Color } from '../index';

describe('Terminal plugin', () => {
  describe('render()', () => {
    it('should wrap text with ANSI codes for red', () => {
      const styled = red('hello');
      const output = render(styled.text, styled.color);
      expect(output).toContain('\x1b[31m');
      expect(output).toContain('hello');
      expect(output).toContain('\x1b[39m');
    });

    it('should wrap text with ANSI codes for green', () => {
      const styled = green('world');
      const output = render(styled.text, styled.color);
      expect(output).toContain('\x1b[32m');
      expect(output).toContain('world');
    });

    it('should wrap text with ANSI codes for blue', () => {
      const styled = blue('test');
      const output = render(styled.text, styled.color);
      expect(output).toContain('\x1b[34m');
      expect(output).toContain('test');
    });

    it('should handle black color', () => {
      const styled = black('text');
      const output = render(styled.text, styled.color);
      expect(output).toContain('\x1b[30m');
    });

    it('should handle white color', () => {
      const styled = white('text');
      const output = render(styled.text, styled.color);
      expect(output).toContain('\x1b[37m');
    });

    it('should handle empty string', () => {
      const styled = red('');
      const output = render(styled.text, styled.color);
      expect(output).toContain('\x1b[31m');
      expect(output).toContain('\x1b[39m');
    });

    it('should wrap in reset code at end', () => {
      const styled = red('text');
      const output = render(styled.text, styled.color);
      expect(output.endsWith('\x1b[39m')).toBe(true);
    });
  });

  describe('ANSI escape codes', () => {
    it('should use correct codes for basic colors', () => {
      expect(render('t', red('').color)).toContain('\x1b[31m');
      expect(render('t', green('').color)).toContain('\x1b[32m');
      expect(render('t', blue('').color)).toContain('\x1b[34m');
    });
  });
});