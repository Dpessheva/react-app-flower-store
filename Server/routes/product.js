const express = require('express')
const authCheck = require('../config/auth-check')
const Product = require('../models/Product')

const router = new express.Router()

function validateProductCreateForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.name !== 'string' || payload.name.length < 3) {
    isFormValid = false
    errors.name = 'Product name must be at least 3 symbols.'
  }
  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 200) {
    isFormValid = false
    errors.description = 'Description must be at least 10 symbols and less than 120 symbols.'
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || typeof payload.imageUrl !== 'string' || !(payload.imageUrl.startsWith('https://') || payload.imageUrl.startsWith('http://')) || payload.imageUrl.length < 14) {
    isFormValid = false
    errors.image = 'Please enter valid Image URL. Image URL must be at least 14 symbols.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const productObj = req.body;
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateProductCreateForm(productObj);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors,
        
      });
    }
   Product
      .create(productObj)
      .then((createdProduct) => {
        res.status(200).json({
          success: true,
          message: 'Product added successfully.',
          data: createdProduct,
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Product with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const productId = req.params.id
    const productObj = req.body
    const validationResult = validateProductCreateForm(productObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Product
      .findById(productId)
      .then(existingProduct => {
        existingProduct.name = productObj.name
        existingProduct.description = productObj.description
        existingProduct.price = productObj.price
        existingProduct.imageUrls = productObj.imageUrls

        existingProduct
          .save()
          .then(editedProduct => {
            res.status(200).json({
              success: true,
              message: 'Product edited successfully.',
              data: editedProduct
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Prodcut with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Product
    .find()
    .then(products => {
      res.status(200).json(products)
    })
})

router.post('/review/:id', authCheck, (req, res) => {
  const id = req.params.id
  const review = req.body.review
  const username = req.user.username

  if (review.length < 4) {
    const message = 'Review must be at least 4 characters long.'
    return res.status(200).json({
      success: false,
      message: message
    })
  }

  Product
    .findById(id)
    .then(product => {
      if (!product) {
        return res.status(200).json({
          success: false,
          message: 'Product not found.'
        })
      }

      let reviewObj = {
        review,
        createdBy: username
      }

      let reviews = product.reviews
      reviews.push(reviewObj)
      product.reviews = reviews
      product
        .save()
        .then((product) => {
          res.status(200).json({
            success: true,
            message: 'Review added successfully.',
            data: product
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :( Check the form for errors.'
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/like/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Product
    .findById(id)
    .then(product => {
      if (!product) {
        const message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = product.likes
      if (!likes.includes(username)) {
        likes.push(username)
      }
      product.likes = likes
      product
        .save()
        .then((product) => {
          res.status(200).json({
            success: true,
            message: 'Product liked successfully.',
            data: product
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/unlike/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Product
    .findById(id)
    .then(product => {
      if (!product) {
        let message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = product.likes
      if (likes.includes(username)) {
        const index = likes.indexOf(username)
        likes.splice(index, 1)
      }

      product.likes = likes
      product
        .save()
        .then((product) => {
          res.status(200).json({
            success: true,
            message: 'Product unliked successfully.',
            data: product
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Product
      .findById(id)
      .then((product) => {
        product
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Product deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router