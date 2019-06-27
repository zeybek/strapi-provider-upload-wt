const wtClient = require('@wetransfer/js-sdk')

module.exports = {
  provider: "WeTransfer",
  name: "WeTransfer",
  auth: {
    apikey: {
      label: "API Key",
      type: "text",
    },
    logger: {
      label: "Debug Level",
      type: "enum",
      values: [
        "error",
        "warn",
        "info",
        "verbose",
        "debug",
        "silly",
      ]
    }
  },
  init: (config) => {

    return {
      upload(file) {
        return new Promise((resolve, reject) => {
          uploadFile(file.buffer, file.name, config.apikey, config.logger).then((transfer)=>{
            file.url = transfer.url
            file.name = transfer.message
            return resolve()
          })
        })
      },
      delete(file) {
       /**
        * Deletes from files list only
        * Will be deleted from WeTransfer after 7 Days
        * Only "Plus Accounts" can delete
        * Read here: https://wetransfer.zendesk.com/hc/en-us/articles/217330206-How-do-I-delete-multiple-transfers-
        */
      },
    };
  },
};

async function uploadFile(file, fileName, apikey, logger) {
  const wt = await wtClient(apikey, {
    logger: {
      level: logger
    }
  });

  const transfer = await wt.transfer.create({
    message: fileName,
    files: [
      {
        name: fileName,
        size: file.length,
        content: file
      }
    ]
  });

  return transfer
};
