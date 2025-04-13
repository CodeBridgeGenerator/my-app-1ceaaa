
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
companyID: faker.lorem.sentence(1),
Items: faker.lorem.sentence(1),
SubTotal: faker.lorem.sentence(1),
Discount: faker.lorem.sentence(1),
Total: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
