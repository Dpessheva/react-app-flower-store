import toastr from 'toastr'

function createProductValidator (name, description, imageUrl, price) {
  if (name.length < 3 || name === '') {
    toastr.error('Name must be at least 3 characters long')
    return false
  }
  if (description.length < 10 || description.length > 200 || description === '') {
    toastr.error('Description must be between 10 and 200 characters long')
    return false
  }
  if (imageUrl.length < 14 || !(imageUrl.startsWith('https://') || imageUrl.startsWith('http://'))) {
    toastr.error('Image URL must be at least 14 characters long and must be valid URL')
    return false
  }
   if (!price || price < 0) {
    toastr.error('Price must be a positive number')
    return false
  }

  return true
}

export default createProductValidator