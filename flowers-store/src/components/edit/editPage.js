import React, {Component} from 'react'
import Input from '../common/Input'
import toastr from 'toastr'
import createProductValidator from '../../utils/createProductValidator'
import NotFoundPage from '../common/NotFoundPage/NotFoundPage'
import {createProductValidationFunc} from '../../utils/formValidator'
import {editProductAction, fetchProductsAction} from '../../actions/productsActions'
import {redirectAction} from '../../actions/authActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class EditPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    const productId = this.props.match.params.id
    let product = this.props.products.find(p => p._id === productId)
    if (product) {
      this.setState({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price.toFixed(2),
      })
    } else {
      this.props.fetchProducts()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.editProductError.hasError) {
      toastr.error(nextProps.editProductError.message)
    } else if (nextProps.editProductSuccess) {
      this.props.redirect()
      toastr.success('Product edited successfully')
      this.props.history.push('/store')
    } else {
      const productId = this.props.match.params.id
      let product = this.props.products.find(p => p._id === productId)
      if (product) {
        this.setState({
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl,
          price: product.price.toFixed(2),
        })
      }
    }
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (!createProductValidator(this.state.name,this.state.description, this.state.imageUrl, this.state.price)) {
      return
    }
    this.props.editProduct(this.props.match.params.id, this.state.name,this.state.description, this.state.imageUrl, this.state.price)
  }

  render () {
    let productId = this.props.match.params.id
    let product = this.props.products.find(o => o._id === productId)
    if (!product) {
      return (
        <NotFoundPage errMessage='PRODUCT NOT FOUND' />
      )
    }

    let validObj = createProductValidationFunc(
      this.state.name,
      this.state.description,
      this.state.imageUrl,
      this.state.price
    )

    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>Edit Product</h1>
          </div>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className='row space-top'>
            <div className='col-md-4'>
              <Input
                type='text'
                name='name'
                label='Name'
                placeholder='Enter name'
                value={this.state.name}
                onChange={this.onChange}
                valid={validObj.validName} />
               <Input
                type='text'
                name='description'
                label='Description'
                placeholder='Enter  description'
                value={this.state.description}
                onChange={this.onChange}
                valid={validObj.validDescription} />
              <Input
                type='text'
                name='image'
                label='Image URL'
                placeholder='Enter image URL'
                value={this.state.imageUrl}
                onChange={this.onChange}
                valid={validObj.validImage} />
              <Input
                type='number'
                name='price'
                label='Price'
                placeholder='Enter  price'
                value={this.state.price}
                onChange={this.onChange}
                valid={validObj.validPrice} />
              <input type='submit' className='btn btn-warning' value='Edit' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    editProductSuccess: state.editProduct.success,
    editProductError: state.editProductError,
    products: state.products
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editProduct: (id, name, description, imageUrl, price) => {
      dispatch(editProductAction(id, {name, description, imageUrl, price}))
    },
    redirect: () => dispatch(redirectAction()),
    fetchProducts: () => dispatch(fetchProductsAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPage))