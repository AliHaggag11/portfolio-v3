const { client } = require('../sanity/config')

async function deleteDocument(documentId: string) {
  try {
    const result = await client.delete(documentId)
    console.log('Deleted document:', result)
  } catch (err) {
    console.error('Delete failed:', err)
  }
}

// The ID of the document you want to delete
const documentId = '61f9ef2b-0762-40a5-a364-f1b95c4a08c7'

deleteDocument(documentId) 