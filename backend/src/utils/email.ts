import path from 'path';
import fs from 'fs';
import handlerbars from 'handlebars';

/**
 *  Given an type return the absolute path of .hbs template.
 * @param {String} type
 * @returns {String}
 */
export const getEmailTemplate = (type: string) => {
  switch (type) {
    case 'forgot-password':
      return handlerbars.compile(fs.readFileSync(path.join(__dirname, '..', '..', 'templates', 'forgot-password.hbs'), 'utf-8'));

    default:
      throw new Error('Template not Found');
  }
};
