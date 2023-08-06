// translate untranslated messages from EN to languages specified in next.config.js
import { readFile, stat, writeFile } from 'fs/promises';

import { translate } from '../src/lib/translation/deepl';

import {
  defaultLanguage,
  encoding,
  languages,
  readTranslationFile,
  resolveTranslationFilePath,
} from './_util';

void translateLocalMessages();

async function translateLocalMessages() {
  await ensureTranslationFileAvailability();

  const referenceTranslationFile = await readTranslationFile(defaultLanguage);

  const translationIds = Object.keys(referenceTranslationFile);

  await Promise.all(
    languages
      .filter((l) => l !== defaultLanguage)
      .map(async (language) => {
        const translationFile = await readTranslationFile(language);

        for (const translationId of translationIds) {
          if (translationFile[translationId]) {
            continue;
          }

          try {
            translationFile[translationId] = {
              defaultMessage: await translate(
                referenceTranslationFile[translationId].defaultMessage,
                language
              ),
            };
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }

          await writeFile(
            resolveTranslationFilePath(language),
            JSON.stringify(translationFile, undefined, 2),
            { encoding }
          );
        }
      })
  );
}

async function fileExists(path: string) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function ensureTranslationFileAvailability() {
  await Promise.all(
    languages.map(async (language) => {
      const path = resolveTranslationFilePath(language);

      if (await fileExists(path)) {
        const content = await readFile(path, { encoding });

        if (content.length === 0) {
          await writeFile(path, '{}', { encoding });
        }

        JSON.parse(content);
      } else {
        await writeFile(path, '{}', { encoding });
      }
    })
  );
}
