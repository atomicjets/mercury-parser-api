import Mercury from '@postlight/mercury-parser';

import { corsSuccessResponse, corsErrorResponse, runWarm } from './utils';

const mercuryParser = async ({ queryStringParameters }, context, cb) => {
  const { url } = queryStringParameters;

  const result = await Mercury.parse(url, {
    contentType: 'markdown',
    'User-Agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0',
  });

  return cb(
    null,
    result
      ? corsSuccessResponse(result)
      : corsErrorResponse({ message: 'There was an error parsing that URL.' })
  );
};

export default runWarm(mercuryParser);
