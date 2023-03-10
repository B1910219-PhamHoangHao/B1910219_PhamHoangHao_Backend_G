const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
            this.contact = client.db().collection("contacts");
        }
        // Định nghĩa các phương thức truy cập CSDL sử dụng mongodb API
    extractConactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // Remove undefined fields
        Objects.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }
    async create(payload) {
        const contact = this.extractConactData(payload);
        const result = await this.contact.findOneAndUpdate(
            contact, { $set: { favorite: contact.favorite === true } }, { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    async find(filter) {
        console.log(filter);
        const cursor = await this.contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return awaitthis.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.contact.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }

}

module.exports = ContactService;