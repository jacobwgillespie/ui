import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import NewOrEdit from 'shared/mixins/new-or-edit';
import ModalBase from 'shared/mixins/modal-base';
import { set } from '@ember/object';
import layout from './template';

export default Component.extend(ModalBase, NewOrEdit, {
  layout,
  classNames: ['large-modal', 'alert'],
  originalModel: alias('modalService.modalOpts'),
  settings: service(),

  clone           : null,
  primaryResource : alias('originalModel'),
  errors          : null,

  actions: {
    updateWhitelist(list) {
      set(this, 'primaryResource.whitelistDomains', list);
    },
  },

  init() {
    this._super(...arguments);
    this.set('clone', this.get('originalModel').clone());
    this.set('model', this.get('originalModel').clone());
    scheduleOnce('afterRender', () => {
      this.$('INPUT')[0].focus();
    });
  },

  editing: function() {
    return !!this.get('clone.id');
  }.property('clone.id'),

  doneSaving() {
    this.send('cancel');
  }
});
