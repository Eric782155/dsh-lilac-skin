/**
 * Lilac skin — the Client half.
 *
 * Every color comes from the reference artwork: deep violet `#7400C2`, vivid
 * violet `#AE57FF`, lilac `#BC83DE`, pale lilac `#E8BFFF`, peach `#F2B99C`,
 * grey `#706E6E`, charcoal `#3C3443` and white. The plan maps them by role:
 *
 *   deep violet   primary accent — brand fill and text in the light scheme,
 *                 and the current Turn on the conversation's turn rail
 *   vivid violet  links, charts, trajectory and selection accents
 *   lilac         selected borders, done state, switch thumb, bubble outline
 *   pale lilac    brand fill and accent in the dark scheme, and the user
 *                 message bubble in the light one
 *   peach         the palette's warm counterpoint; its bolder steps live in the
 *                 detail illustration rather than in the UI
 *   grey          secondary text, idle state, ghost button borders
 *   charcoal      light-scheme text and the light toast/tooltip surface
 *   white         light-scheme raised surfaces
 *
 * The skin is a theme token layer, not a replacement palette: it is registered
 * through `ctx.theme.overrideTokens`, which stacks `{ light, dark }` values over
 * whichever base palette is active and picks the half matching the user's
 * appearance setting. Tokens the skin does not list keep their stock value, and
 * the layer is owned by `ctx.effect`, so disabling the plugin restores the
 * stock colors without a reload.
 */
window.__ModuleLoader__.load({
  id: 'dsh-lilac-skin',
  factory(require) {
    /** One value per color scheme; the theme service requires both halves. */
    const P = (light, dark) => ({ light, dark })

    /** Alias-layer token overrides, grouped by the role each one plays. */
    const TOKENS = {
      // Surfaces.
      '--dsw-alias-bg-base': P('#FBF8FE', '#16121C'),
      '--dsw-alias-bg-layer-1': P('#FFFFFF', '#1E1926'),
      '--dsw-alias-bg-layer-2': P('#FBF8FE', '#241E2E'),
      '--dsw-alias-bg-layer-3': P('#FFFFFF', '#2B2436'),
      '--dsw-alias-bg-overlay': P('#F4ECFB', '#241E2F'),
      '--dsw-alias-bg-module-platform': P('#F6F0FC', '#2B2436'),
      '--dsw-alias-bg-multi-select': P('#F6F0FC', '#2B2436'),
      '--dsw-alias-bg-skeleton': P('rgba(60, 52, 67, 0.05)', 'rgba(232, 191, 255, 0.08)'),
      '--dsw-alias-bg-document-selection': P('rgba(116, 0, 194, 0.30)', 'rgba(232, 191, 255, 0.30)'),

      // Borders.
      '--dsw-alias-border-l1': P('rgba(60, 52, 67, 0.06)', 'rgba(232, 191, 255, 0.08)'),
      '--dsw-alias-border-l2': P('rgba(60, 52, 67, 0.12)', 'rgba(232, 191, 255, 0.14)'),
      '--dsw-alias-border-l3': P('rgba(60, 52, 67, 0.16)', 'rgba(232, 191, 255, 0.18)'),
      '--dsw-alias-border-l4': P('rgba(60, 52, 67, 0.20)', 'rgba(232, 191, 255, 0.22)'),
      '--dsw-alias-border-selected': P('#BC83DE', '#BC83DE'),

      // Brand and buttons.
      '--dsw-alias-brand-primary': P('#7400C2', '#E8BFFF'),
      '--dsw-alias-brand-primary-invert': P('#3C3443', '#F4EDFF'),
      '--dsw-alias-brand-primary-new-colorprimary-new-color': P('#AE57FF', '#AE57FF'),
      '--dsw-alias-brand-text': P('#6B00B8', '#E8BFFF'),
      '--dsw-alias-button-contrast-fill': P('#3C3443', '#E8BFFF'),
      '--dsw-alias-button-elevated-fill': P('#FFFFFF', '#2B2436'),
      '--dsw-alias-button-floating-fill': P('#FFFFFF', '#241E2E'),
      '--dsw-alias-button-floating-hover': P('#F6F0FC', '#2E2639'),
      '--dsw-alias-button-primary-fill': P('#7400C2', '#E8BFFF'),
      '--dsw-alias-button-primary-hover': P('#59009A', '#F6ECFF'),
      '--dsw-alias-button-primary-dimmed': P('#EADCF6', '#3A2F4A'),
      '--dsw-alias-button-ghost-active-border': P('#706E6E', '#857F8C'),
      '--dsw-alias-button-ghost-active-fill': P('#F1E9FA', '#2E2639'),
      '--dsw-alias-button-ghost-active-hover': P('#E9DEF7', '#352C42'),
      '--dsw-alias-button-info-fill': P('#7400C2', '#AE57FF'),
      '--dsw-alias-button-info-hover': P('#59009A', '#C08CFF'),

      // Cards and interactive fills.
      '--dsw-alias-card-fill': P('#FAF7FE', '#201A2A'),
      '--dsw-alias-card-fill-hover': P('#F4EDFB', '#282034'),
      '--dsw-alias-card-tile-fill': P('rgba(255, 255, 255, 0.50)', 'rgba(232, 191, 255, 0.05)'),
      '--dsw-alias-interactive-bg-hover': P('rgba(116, 0, 194, 0.06)', 'rgba(232, 191, 255, 0.07)'),
      '--dsw-alias-interactive-bg-hover-accent': P('rgba(116, 0, 194, 0.14)', 'rgba(232, 191, 255, 0.20)'),
      '--dsw-alias-interactive-bg-hover-solid': P('#F1E9FA', '#2C2438'),
      '--dsw-alias-interactive-bg-active': P('rgba(116, 0, 194, 0.10)', 'rgba(232, 191, 255, 0.13)'),

      // Text.
      '--dsw-alias-label-primary': P('#3C3443', '#F4EDFF'),
      '--dsw-alias-label-primary-bluish': P('#3C3443', '#F4EDFF'),
      '--dsw-alias-label-primary-dimmed': P('#4C4455', '#EADFF9'),
      '--dsw-alias-label-primary-foreground': P('#FFFFFF', '#1A1322'),
      '--dsw-alias-label-primary-inverted': P('#FFFFFF', '#2A2233'),
      '--dsw-alias-label-on-color': P('#FFFFFF', '#FFFFFF'),
      '--dsw-alias-label-secondary': P('#706E6E', '#C6B4DC'),
      '--dsw-alias-label-tertiary': P('#7C7684', '#9C8CB2'),
      '--dsw-alias-label-caption': P('#8B8693', '#9184A9'),
      '--dsw-alias-label-dimmed': P('#D8D0E0', '#3A3148'),
      '--dsw-alias-link': P('#7400C2', '#C99BFF'),
      '--dsw-alias-menu-icon': P('#4A4254', '#C6B4DC'),

      // Markdown and code surfaces.
      '--dsw-alias-markdown-citation': P('#F3ECFA', '#2A2335'),
      '--dsw-alias-markdown-code-block': P('#F7F2FD', '#191420'),
      '--dsw-alias-markdown-code-block-banner': P('#F1E9FA', '#1D1824'),
      '--dsw-alias-markdown-code-segment-selected': P('#FFFFFF', '#2B2436'),
      '--dsw-alias-markdown-code-segment-unselected': P('#F1E9FA', '#191420'),
      '--dsw-alias-markdown-inline-code': P('#F3ECFA', '#241D2E'),
      '--dsw-alias-markdown-placeholder': P('#EDE4F7', '#221C2A'),
      '--dsw-alias-markdown-tag': P('#F1E9FA', '#241D2E'),

      // Scrollbars: darkened so the thumb reads on both the base surface and
      // the elevated one; the hover step is a further, clearly visible step
      // away from its own default (darker in light, brighter in dark, where a
      // darker thumb would sink into the near-black surface).
      '--dsw-alias-scrollbar-bg-l1': P('#C3ABDE', '#4A3F5A'),
      '--dsw-alias-scrollbar-bg-l2': P('#BAA0D8', '#554866'),
      '--dsw-alias-scrollbar-hover-l1': P('#A181C6', '#5E5170'),
      '--dsw-alias-scrollbar-hover-l2': P('#9674BC', '#695B7C'),

      // States the palette owns. Success, warning and error keep their stock
      // semantics so status still reads at a glance.
      '--dsw-alias-state-idle-primary': P('#706E6E', '#706E6E'),
      '--dsw-alias-state-done-primary': P('#7400C2', '#BC83DE'),
      '--dsw-alias-state-business-primary': P('#7400C2', '#C99BFF'),
      '--dsw-alias-state-business-tertiary': P('#EADCF6', '#3A2F4A'),
      '--dsw-alias-switch-thumb': P('#FFFFFF', '#BC83DE'),

      // Floating surfaces.
      '--dsw-alias-toast-bg': P('#3C3443', '#2D2538'),
      '--dsw-alias-toast-label': P('#FFFFFF', '#F4EDFF'),
      '--dsw-alias-toast-action': P('#E8BFFF', '#C99BFF'),
      '--dsw-alias-tooltip-bg': P('#3C3443', '#2D2538'),
      '--dsw-alias-tooltip-label': P('#FFFFFF', '#F4EDFF'),
      '--dsw-alias-hovercard-bg': P('#3A3144', '#221C2C'),
      '--dsw-alias-hovercard-label-primary': P('#FFFFFF', '#F4EDFF'),
      '--dsw-alias-hovercard-label-secondary': P('#E8BFFF', '#C6B4DC'),
      '--dsw-alias-hovercard-label-tertiary': P('#C493E2', '#9C8CB2'),
      '--dsw-alias-hovercard-state-done': P('#BC83DE', '#BC83DE'),

      // Charts, trajectory and turn triggers.
      '--dsw-alias-chart-messages': P('#7400C2', '#AE57FF'),
      '--dsw-alias-chart-tools': P('#AE57FF', '#BC83DE'),
      '--dsw-alias-chart-system': P('#706E6E', '#706E6E'),
      '--dsw-alias-trajectory-accent': P('#AE57FF', '#AE57FF'),
      '--dsw-alias-turn-trigger-bg': P('#F7F2FD', '#191420'),
      '--dsw-alias-turn-trigger-bg-hover': P('rgba(116, 0, 194, 0.06)', 'rgba(232, 191, 255, 0.07)'),

      // Illustration tones.
      '--dsw-alias-illustration-background': P('#F6F0FC', '#241E2E'),
      '--dsw-alias-illustration-backing': P('#DCCBE9', '#3A2F4A'),
      '--dsw-alias-illustration-detail': P('#BC83DE', '#5A4A6E'),
      '--dsw-alias-illustration-inset': P('#E8DBF5', '#2E2638'),
      '--dsw-alias-illustration-shadow': P('#D9C8E9', '#241E2E'),
      '--dsw-alias-illustration-surface': P('#EBE0F6', '#322A3D'),

      // Sidebar, menus and composer surfaces.
      '--dsw-specific-sidebar-fill': P('#F7F1FC', '#120F18'),
      '--dsw-specific-sidebar-nav-item-active': P('#EFE6F8', '#2E2639'),
      '--dsw-specific-sidebar-nav-item-active-accent': P('#E4D5F4', '#3A2F4A'),
      '--dsw-menu-surface-fill': P('rgba(252, 249, 254, 0.72)', 'rgba(36, 30, 46, 0.64)'),
      '--dsw-specific-menu': P('rgba(252, 249, 254, 0.72)', 'rgba(36, 30, 46, 0.64)'),
      '--dsw-alias-menu-group-header-fill': P('rgba(247, 242, 252, 0.94)', 'rgba(36, 30, 46, 0.94)'),
      '--dsw-specific-selector': P('#F1E9FA', '#2A2334'),
      '--dsw-specific-tip': P('#F3ECFA', '#24202E'),
      '--dsw-specific-guide-hero': P('#EDE2F7', '#2E2638'),
      '--dsw-specific-input-major': P('#FFFFFF', '#241E2E'),
      '--dsw-specific-login-input': P('#FBF8FE', '#191420'),

      // The user message bubble carries a pale, low-saturation lilac: the
      // outline gives it its edge, so the fill itself stays light.
      '--dsw-specific-bubble': P('#F0E4FF', '#463A57'),
      '--dsw-specific-bubble-highlight': P('#BC83DE', '#AE57FF'),
    }

    /**
     * The conversation's turn rail paints its current mark with the primary
     * text token (`label-primary`), which the token layer cannot scope to that
     * one rule without recoloring every line of transcript text. This small
     * stylesheet overrides exactly that rule with a soft lilac, well below the
     * weight of the deep brand color while still clearing the idle ticks; the
     * dark scheme keeps the pale lilac the rail already needs against the
     * near-black surface. The selector walks the
     * rail's own structure (`nav > scroller > marks > button[data-index]`)
     * because CSS-module class names arrive hashed, and `data-index` is
     * published by no other button in the Client. The tag is created inside
     * `ctx.effect` so disabling the skin removes it with the token layer.
     */
    const RAIL_STYLES = [
      "nav > div > div > button[data-index][aria-current='true']::before {",
      '  background: #C69DE4;',
      '}',
      // The hovered (or keyboard-focused) tick normally takes `label-tertiary`,
      // which reads as the same near-black the rail used for its active mark.
      // The previewed mark is the only one carrying `aria-describedby`, so one
      // rule covers pointer preview and focus preview alike.
      'nav > div > div > button[data-index][aria-describedby]::before {',
      '  background: #BC83DE;',
      '}',
      "body[data-ds-dark-theme] nav > div > div > button[data-index][aria-current='true']::before {",
      '  background: #E8BFFF;',
      '}',
      "body[data-ds-dark-theme] nav > div > div > button[data-index][aria-describedby]::before {",
      '  background: #D4A9F0;',
      '}',
    ].join('\n')

    return {
      inject: ['theme'],
      apply(ctx) {
        ctx.effect(
          () => ctx.theme.overrideTokens('dsh-lilac-skin', TOKENS),
          'lilac-skin: alias token layer',
        )
        ctx.effect(() => {
          const style = document.createElement('style')
          style.textContent = RAIL_STYLES
          document.head.append(style)
          return () => { style.remove() }
        }, 'lilac-skin: turn rail mark')
      },
    }
  },
})
