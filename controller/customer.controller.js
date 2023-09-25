// Assume you have defined the 'notifyAndConfirmDelivery' function and other schemas as mentioned earlier.

// Function to notify the customer about order status changes.
async function notifyCustomer(orderId, message) {
    const order = await Order.findById(orderId);
  
    if (!order) {
      return 'Order not found';
    }
  
    // Assuming you have a 'customer' field in the order schema that stores the customer's reference.
    const customer = await Customer.findById(order.customer);
  
    if (!customer) {
      return 'Customer not found';
    }
  
    // Simulated customer notification (replace with your actual notification mechanism).
    informCustomer(customer, message);
  }
  
  // Function to inform the customer (replace with your actual notification mechanism).
  function informCustomer(customer, message) {
    console.log(`Customer ${customer.name}: ${message}`);
  }