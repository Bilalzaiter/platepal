// Function to assign the nearest available delivery person to an order.
async function assignNearestDeliveryPerson(orderId) {
    const order = await Order.findById(orderId);
  
    if (!order) {
      return 'Order not found';
    }
  
    if (order.deliveryPerson) {
      return 'Order already assigned to a delivery person';
    }
  
    // Find the nearest available delivery person using the $geoNear aggregation.
    const nearestDeliveryPerson = await DeliveryPerson.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [order.deliveryAddress.longitude, order.deliveryAddress.latitude],
          },
          distanceField: 'distance',
          maxDistance: 10000, // Maximum distance in meters (adjust as needed).
          spherical: true,
        },
      },
      { $match: { isAvailable: true } }, // Only consider available delivery persons.
      { $limit: 1 }, // Limit the result to the nearest available delivery person.
    ]);
  
    if (nearestDeliveryPerson.length === 0) {
      return 'No available delivery person found within the specified radius';
    }
  
    // Update the order with the assigned delivery person.
    order.deliveryPerson = nearestDeliveryPerson[0]._id;
    await order.save();
  
    return `Order assigned to delivery person: ${nearestDeliveryPerson[0].name}`;
  }