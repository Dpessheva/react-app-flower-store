import React, { Component } from 'react'
import CandyCardList from '../common/Candy/CandyCardList'
import Paginator from '../common/Paginator'
import { connect } from 'react-redux'
import { fetchProductsAction } from '../../actions/productsActions';


class StorePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }

    this.onChange = this.onChange.bind(this)

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    let { products, stats } = this.props
    products = products.sort((a, b) => a.name.localeCompare(b.name))
    let productsCount = stats.productsCount
    const page = Number(this.props.match.params.page) || 1
    let query = this.state.query
    if (query !== '') {
      products = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      productsCount = products.length
    }

    const pageSize = 9
    products = products.slice((page - 1) * pageSize, page * pageSize)

    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1 className='jumbotron-heading text-center'>Store</h1>
            <form className='form-inline md-form form-sm active-cyan active-cyan-2'>
              <i className='fa fa-search' aria-hidden='true' />
              <input
                className='form-control form-control-sm ml-3 w-75'
                type='text'
                placeholder='Search for the product you are looking for...'
                aria-label='Search'
                name='query'
                onChange={this.onChange}
                value={this.state.query} />
            </form>
          </div>
        </div>
        <CandyCardList products={products} />
        <Paginator
          productsCount={productsCount}
          pageSize={pageSize}
          current={page} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    stats: state.stats
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: (data) => dispatch(fetchProductsAction(data)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(StorePage)