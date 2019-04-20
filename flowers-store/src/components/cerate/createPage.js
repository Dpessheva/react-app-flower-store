import React, {Component} from 'react'
import Input from '../common/Input'
import toastr from 'toastr'
import createProductValidator from '../../utils/createProductValidator'
import {createProductValidationFunc} from '../../utils/formValidator'
import {createProductAction} from '../../actions/productsActions'
import {redirectAction} from '../../actions/authActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


class CreatePage extends Component {
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

 
  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  async onSubmit (e) {
    e.preventDefault()
    this.setState({submitting: true});
    if (!createProductValidator(this.state.name, 
      this.state.description, this.state.imageUrls, this.state.price)) {
        toastr.error(this.props.createProductError.message)
      return
    }
    await this.props.createProduct(this.state.name,this.state.description,
    this.state.imageUrl, this.state.price);
    toastr.success('Offer created successfully')
    this.setState({submitting: false});
    this.props.history.push('/store')
  
  }

  render () {
    let validObj = createProductValidationFunc(
      this.state.name,
      this.state.description,
      this.state.imageUrl,
      this.state.price
   )
     

    return (
      <div className='form-wrapper'>
       <h1>Create New Offer</h1>
        <form onSubmit={this.onSubmit}>
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
                placeholder='Enter description'
                value={this.state.description}
                onChange={this.onChange}
                valid={validObj.validDescription} />
              <Input
                type='text'
                name='imageUrl'
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
              <input type="submit" className="btn btn-primary" value="Create" disabled={this.state.submitting}/>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    createProductSuccess: state.createProduct.success,
    createProductError: state.createProductError
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createProduct: (name, description, imageUrl,  price) => {
      dispatch(createProductAction({name, description, imageUrl,price}))
    },
    redirect: () => dispatch(redirectAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePage))