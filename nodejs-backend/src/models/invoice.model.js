
    module.exports = function (app) {
        const modelName = 'invoice';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            companyID: { type:  String , required: true, default: "" },
Items: { type:  String , required: true },
SubTotal: { type: Number, required: false, max: 10000000 },
Discount: { type: Number, required: false, max: 10000000 },
Total: { type: Number, required: false, max: 10000000 },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };