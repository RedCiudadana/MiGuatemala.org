import Ember from 'ember';

export default Ember.Route.extend({
  spreadsheets: Ember.inject.service(),
  _routing: Ember.inject.service('-routing'),

  model(params) {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');
    const perfil = this.store.peekRecord('perfil', params.id);
    const institucion = perfil.get('institucion');
    const partidoActual = perfil.get('partidoActual');

    return Ember.RSVP.hash({
      config: {},
      perfil: perfil,
      institucion: institucion,
      partidoActual: partidoActual,
      perfilInformacionGeneralConfiguracion: spreadsheet
        .fetch('perfil-informacion-general-configuracion'),
      perfilFuncionalidades: spreadsheet
        .fetch('perfil-funcionalidades')
        .then((links) => {
          return Ember.A(links)
            .filter((link) => {
              if (link.link) {
                return true;
              }

              if (!_routing.hasRoute(link.route)) {
                throw new Error(`Route not recognized: ${link.route}`);
              }

              return true;
            });
        })
    });
  },

  afterModel(model) {
    if (!Ember.isNone(model.perfil.get('nombre'))) {
      this.set('breadCrumb', {
        title: model.perfil.get('nombre')
      });
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

    model.config.perfilFuncionalidades = model.perfilFuncionalidades;
  },

  actions: {
    didTransition() {
      window.scrollTo(0, 0);
    }
  }
});
