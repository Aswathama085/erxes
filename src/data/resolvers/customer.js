import { Conversations, Tags } from '../../db/models';

export default {
  getIntegrationData(customer) {
    return {
      messenger: customer.messengerData || {},
      twitter: customer.twitterData || {},
      facebook: customer.facebookData || {},
    };
  },

  getMessengerCustomData(customer) {
    const results = [];
    const messengerData = customer.messengerData || {};
    const data = messengerData.customData || {};

    Object.keys(data).forEach(key => {
      results.push({
        name: key.replace(/_/g, ' '),
        value: data[key],
      });
    });

    return results;
  },

  getTags(customer) {
    return Tags.find({ _id: { $in: customer.tagIds || [] } });
  },

  conversations(customer) {
    return Conversations.find({ customerId: customer._id });
  },
};
