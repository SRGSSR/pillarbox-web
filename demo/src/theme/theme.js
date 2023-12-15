
import themeCSS from 'bundle-text:./theme.scss';
import animationsCSS from 'bundle-text:./animations.scss';
import { unsafeCSS } from 'lit';

export const theme = unsafeCSS(themeCSS);
export const animations = unsafeCSS(animationsCSS);
