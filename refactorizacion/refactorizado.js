function getOrderNotification(order) {
    const messages = [];
    const paymentMethods = getPaymentMethods(order);
    const selectedPaymentMethod = paymentMethods.selectedMethod;
    const paymentType = selectedPaymentMethod ? selectedPaymentMethod.type : getPaymentType(order);
  
    if (order.provider === "PROVIDER_1") {
      handleProvider1Status(order, messages);
    } else if (!order.locator) {
      messages.push("pedido no pudo ser procesado");
    } else {
      if (order.associated) {
        handleAssociatedOrder(order, paymentType, paymentMethods, messages);
      } else {
        handleUnassociatedOrder(order, paymentType, paymentMethods, messages);
      }
    }
  
    return messages;
  }
  
  function getPaymentType(order) {
    return order.country === "FR" && order.id < 745 ? "PAYPAL" : null;
  }
  
  function handleProvider1Status(order, messages) {
    const { productStatus } = order;
    if (["PENDING", "ERROR"].includes(productStatus)) {
      messages.push("no confirmado con provider 1");
    }
    if (productStatus === "CANCELLED") {
      messages.push("cancelado");
    }
  }
  
  function handleAssociatedOrder(order, paymentType, paymentMethods, messages) {
    const status = order.productStatus;
  
    if (["PROVIDER_PENDING", "PENDING", "WAITING_FOR_PAYMENT"].includes(status)) {
      messages.push(getPaymentMessage(paymentType, paymentMethods));
    } else if (status === "WAITING_FOR_SHIPMENT") {
      messages.push(paymentMethods.debit ? "pago confirmado pendiente de envío" : "pendiente de cobro");
    } else if (status === "ERROR") {
      messages.push("error proveedor");
    } else if (["RESERVED", "SOLD"].includes(order.status)) {
      messages.push(order.reseller === "RESELLER_X" ? "confirmado con reseller X" : "confirmado");
    } else if (["CANCELLED", "REJECTED"].includes(status)) {
      messages.push("cancelado o rechazado");
    }
  }
  
  function handleUnassociatedOrder(order, paymentType, paymentMethods, messages) {
    const status = order.productStatus;
  
    if (["PROVIDER_PENDING", "PENDING"].includes(status)) {
      messages.push(getUnassociatedPaymentMessage(paymentType, paymentMethods));
    } else if (status === "WAITING_FOR_SHIPMENT") {
      messages.push("esperando envío");
    } else if (status === "CANCELLED") {
      messages.push("cancelado");
    } else if (status === "ERROR") {
      messages.push("error proveedor");
    } else if (["RESERVED", "SOLD"].includes(order.status)) {
      const resellers = ["RESELLER_Y", "RESELLER_Z"];
      messages.push(resellers.includes(order.reseller) ? "confirmado" : "confirmado reseller especial");
    }
  }
  
  function getPaymentMessage(paymentType, paymentMethods) {
    if (paymentType === "BANK_TRANSFER") return "esperando transferencia";
    if (["PAYPAL", "CREDIT_CARD"].includes(paymentType)) return "pago con crédito";
    if (paymentMethods.debit) return "pago con débito";
    if (!paymentMethods.authRequired) return "no requiere autorización";
    return "pendiente de cobro";
  }
  
  function getUnassociatedPaymentMessage(paymentType, paymentMethods) {
    if (paymentType === "BANK_TRANSFER") return "esperando transferencia";
    if (paymentType === "PAYPAL") return "esperando paypal";
    if (["CREDIT_CARD", "DEBIT_CARD"].includes(paymentType)) return "esperando tarjeta";
    if (paymentMethods.authRequired) return "esperando autorización";
    return "pendiente de cobro";
  }
  

  function getPaymentMethods(order) {
    return {
      selectedMethod: order.payment || null,  
      debit: order.payment && order.payment.type === "DEBIT_CARD", 
      authRequired: order.payment && order.payment.requiresAuth,  
    };
  }


  module.exports = { getOrderNotification };