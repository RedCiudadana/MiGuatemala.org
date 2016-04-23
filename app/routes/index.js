import Ember from 'ember';

export default Ember.Route.extend({

  ajax: Ember.inject.service(),

  model() {

    // TODO: Consider fail mechanism

    return this
      .get('ajax')
      .request('data/data.json')
      .then((response) => {

        const funcionarios = Ember.A(response.data).map(
          function(funcionario) {

            funcionario.fechaNacimiento = funcionario['fecha-nacimiento'];

            funcionario.institucionCodigo =
              funcionario['institucion'] && funcionario['institucion']['codigo'] ?
                ('pf-' + funcionario['institucion']['codigo']) :
                '';

            funcionario.fotoFuncionario = funcionario['foto-funcionario'] ?
              funcionario['foto-funcionario'] :
              'images/magistrados/Congreso/Magistrado.jpg';

            funcionario.cargoNombreCompleto =
              funcionario['cargo'] && funcionario['cargo']['nombre-completo'] ?
                funcionario['cargo']['nombre-completo'] :
                'Valor por defecto para \'cargo.nombre-completo\'';

            funcionario.cargoNombreCorto =
              funcionario['cargo'] && funcionario['cargo']['nombre-corto'] ?
                funcionario['cargo']['nombre-corto'] :
                'Valor por defecto para \'cargo\'';

            funcionario.institucionNombreCompleto =
              funcionario['institucion'] && funcionario['institucion']['nombre-completo'] ?
                funcionario['institucion']['nombre-completo'] :
                'Valor por defecto para \'institucion\'';

            return funcionario;
          }
        );

        let instituciones = {};

        funcionarios.mapBy('institucion').forEach((e) => {
          if (null === e) {
            return;
          }

          e.nombreCorto = e['nombre-corto'];
          e.selector = 'pf-' + e['codigo'];

          instituciones[e['codigo']] = e;
        });

        return {
          funcionarios: funcionarios,
          instituciones: instituciones
        };
      });
  },

  setupController(controller, model) {
    this._super(controller, model);

    Ember.run.scheduleOnce('afterRender', this, function() {
      var $container = Ember.$('#portfolio');

      Ember.$(window).resize(function() {
        $container.isotope('layout');
      });
    });
  },

  actions: {
    applyFilter(selector) {

      var $container = Ember.$('#portfolio');

      Ember.$('#portfolio-filter li').removeClass('activeFilter');

      Ember.$('#' + selector).addClass('activeFilter');

      var isotopeSelector = 'pf-todos' === selector ? '*' : '.' + selector;

      $container.isotope({transitionDuration: '0.65s'});

      $container.isotope({filter: isotopeSelector});

      return false;
    },

    applyShuffle() {
      var $container = Ember.$('#portfolio');

      $container.isotope({transitionDuration: '0.65s'});

      $container.isotope('updateSortData').isotope({
        sortBy: 'random'
      });
    }
  }
});
