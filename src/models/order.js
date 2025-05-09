export default class Order {
    constructor({ slipper, size, name, phone, city, np, quantity }) {
        this.model = slipper?.name || "Unknown";
        this.size = size || "Not selected";
        this.cost = slipper?.cost * quantity;
        this.city = city;
        this.np = np;
        this.name = name;
        this.phone = phone;
        this.timestamp = new Date().toLocaleString();
    }

    toFirebaseObject() {
        return {
            selectedModel: this.model,
            selectedSize: this.size,
            cost: this.cost,
            city: this.city,
            novaPoshta: this.np,
            name: this.name,
            phone: this.phone,
            timestamp: this.timestamp,
        };
    }
}