const wtClient = require('@wetransfer/js-sdk')

module.exports = {
  provider: "WeTransfer",
  name: "WeTransfer",
  auth: {
    apikey: {
      label: "API Key",
      type: "text",
    },
  },
  init: (config) => {

    return {
      upload(file) {
        return new Promise((resolve, reject) => {
          uploadFile(file.buffer, file.name, config.apikey).then((transfer)=>{
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

async function uploadFile(file, fileName, apikey) {
  const wt = await wtClient(apikey);

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
