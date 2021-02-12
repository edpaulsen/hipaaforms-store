import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'test@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  products:[
    {
        name: 'Basic Subscription',
        category: 'Subscription',
        image: '/images/product.png',
        price: 0,
        countInStock: 0,
        brand: 'HIPAA Forms',
        rating: 4.5,
        numReviews: 10,
        description: 'Free Version of HIPAA forms allowing for 1 form and 25 submissions per month',
      },

      {
        name: 'Standard Monthly Subscription',
        category: 'Subscription',
        image: '/images/product.png',
        price: 55,
        countInStock: 20,
        brand: 'HIPAA Forms',
        rating: 2.5,
        numReviews: 100,
        description: 'Standard HIPAA forms monthly subscription.  Unlimited forms and Unlimited form submissions',
      },

      {
        name: 'Standard Monthly with File Upload',
        category: 'Subscription',
        image: '/images/product.png',
        price: 85,
        countInStock: 20,
        brand: 'HIPAA Forms',
        rating: 1.5,
        numReviews: 5555,
        description: 'Standard HIPAA forms monthly subscription with File Upload.  Unlimited forms, Unlimited form submissions, & unlimited file uploads',
      },

      {
        name: 'Standard Quarterly Subscription',
        category: 'Subscription',
        image: '/images/product.png',
        price: 160,
        countInStock: 20,
        brand: 'HIPAA Forms',
        rating: 5,
        numReviews: 10,
        description: 'Standard HIPAA forms quarterly subscription.  Unlimited forms and Unlimited form submissions',
      },

      {
         name: 'Standard Quarterly Subscription with File Upload',
        category: 'Subscription',
        image: '/images/product.png',
        price: 240,
        countInStock: 20,
        brand: 'HIPAA Forms',
        rating: 4.5,
        numReviews: 10,
        description: 'Standard HIPAA forms quarterly subscription with File Upload.  Unlimited forms, Unlimited form submissions, & unlimited file uploads',
      },

      {
        name: 'Standard Yearly Subscription',
        category: 'Subscription',
        image: '/images/product.png',
        price: 600,
        countInStock: 20,
        brand: 'HIPAA Forms',
        rating: 4.5,
        numReviews: 10,
        description: 'Standard HIPAA forms yearly subscription.  Unlimited forms and Unlimited form submissions',
      },

      {
        name: 'Standard Yearly Subscription with File Upload',
        category: 'Subscription',
        image: '/images/product.png',
        price: 900,
        countInStock: 20,
        brand: 'HIPAA Forms',
        rating: 5,
        numReviews: 10,
        description: 'Standard HIPAA forms yearly subscription with File Upload.  Unlimited forms, Unlimited form submissions, & unlimited file uploads',
      }

],
};
export default data;
