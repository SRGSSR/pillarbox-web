
import router from './router';
import { LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html';

export class RouteOutletComponent extends LitElement {
  static properties = {
    route: { state: true }
  };

  constructor() {
    super();

    this.route = router.currentRoute;
    router.addEventListener('routechanged', ({ detail: { route }}) => {
      this.route?.destroy();
      this.route = route;
    });
  }

  render() {
    return unsafeHTML(`<${this.route.component}></${this.route.component}>`);
  }
}

customElements.define('route-outlet', RouteOutletComponent);
