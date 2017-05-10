import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  nombre: attr(),
  fotoUrl: attr(),
  cargoNombreCompleto: attr(),
  cargoNombreCorto: attr(),
  profesion: attr(),
  educacion: attr(),
  fechaNacimiento: attr(),
  lugarNacimiento: attr(),
  email: attr(),
  fb: attr(),
  tw: attr(),
  direccion: attr(),
  telefono: attr(),
  biografia: attr(),
  desempenio: attr(),
  historialPolitico: attr(),
  experienciaProfesional: attr(),
  experienciaEnDH: attr(),

  informacionGeneral: attr('informacion-general'),
  frenteAFrente: attr('frente-a-frente'),

  fotoPerfil: Ember.computed('fotoUrl', function() {
    if (this.get('fotoUrl')) {
      return this.get('fotoUrl');
    }

    return 'images/Magistrado.jpg';
  }),

  disqusIdentifier: Ember.computed('id', function() {
    return `perfil-${this.get('id')}`;
  })
});
