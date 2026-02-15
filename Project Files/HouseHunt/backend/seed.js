require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Owner = require('./models/Owner');
const Property = require('./models/Property');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log('🗑️  Clearing existing properties...');
        await Property.deleteMany({});

        // Create or find an approved owner
        console.log('👤 Creating sample owner...');
        const hashedPassword = await bcrypt.hash('owner123', 10);

        let owner = await Owner.findOne({ email: 'owner@househunt.com' });
        if (!owner) {
            owner = await Owner.create({
                name: 'John Property Owner',
                email: 'owner@househunt.com',
                password: hashedPassword,
                role: 'owner',
                isApproved: true
            });
        } else {
            owner.isApproved = true;
            await owner.save();
        }

        console.log('🏠 Creating sample properties...');

        const sampleProperties = [
            {
                title: 'Luxury 3BHK Apartment in Downtown',
                description: 'Beautiful spacious apartment with modern amenities, perfect for families. Features include modular kitchen, wooden flooring, and 24/7 security. Located in the heart of the city with easy access to shopping malls, restaurants, and metro station.',
                location: 'Mumbai, Maharashtra',
                rent: 45000,
                propertyType: 'flat',
                bedrooms: 3,
                bathrooms: 2,
                amenities: ['WiFi', 'Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup'],
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
                ],
                availability: true,
                ownerId: owner._id
            },
            {
                title: 'Cozy 2BHK Near IT Park',
                description: 'Well-maintained 2BHK apartment near major IT parks. Ideal for working professionals. Fully furnished with AC, refrigerator, and washing machine. Close to supermarkets and hospitals.',
                location: 'Bangalore, Karnataka',
                rent: 28000,
                propertyType: 'flat',
                bedrooms: 2,
                bathrooms: 2,
                amenities: ['WiFi', 'Parking', 'Lift', 'Water Supply', 'Security'],
                images: [
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
                    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
                ],
                availability: true,
                ownerId: owner._id
            },
            {
                title: 'Spacious Villa with Garden',
                description: 'Independent 4BHK villa with beautiful garden and terrace. Perfect for large families who love outdoor space. Features include servant quarters, covered parking for 2 cars, and solar water heater.',
                location: 'Pune, Maharashtra',
                rent: 65000,
                propertyType: 'house',
                bedrooms: 4,
                bathrooms: 3,
                amenities: ['Garden', 'Parking', 'Terrace', 'Security', 'Power Backup', 'Water Supply'],
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
                ],
                availability: true,
                ownerId: owner._id
            },
            {
                title: 'Modern Studio Apartment',
                description: 'Compact and efficient studio apartment perfect for students or single professionals. Fully furnished with all modern amenities. Located near university campus and public transport.',
                location: 'Delhi, NCR',
                rent: 15000,
                propertyType: 'room',
                bedrooms: 1,
                bathrooms: 1,
                amenities: ['WiFi', 'Furnished', 'AC', 'Security', 'Water Supply'],
                images: [
                    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
                    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'
                ],
                availability: true,
                ownerId: owner._id
            },
            {
                title: 'Beachside 2BHK Apartment',
                description: 'Stunning sea-facing apartment with breathtaking ocean views. Wake up to the sound of waves! Features balcony, modern kitchen, and access to beach. Perfect for those who love coastal living.',
                location: 'Goa',
                rent: 35000,
                propertyType: 'flat',
                bedrooms: 2,
                bathrooms: 2,
                amenities: ['Sea View', 'Balcony', 'Parking', 'Security', 'Swimming Pool', 'Gym'],
                images: [
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
                ],
                availability: true,
                ownerId: owner._id
            },
            {
                title: 'Premium 3BHK with City View',
                description: 'High-rise luxury apartment on 15th floor with panoramic city views. Premium fittings, Italian marble flooring, and smart home features. Located in prime residential area.',
                location: 'Hyderabad, Telangana',
                rent: 52000,
                propertyType: 'flat',
                bedrooms: 3,
                bathrooms: 3,
                amenities: ['WiFi', 'Parking', 'Gym', 'Swimming Pool', 'Security', 'Lift', 'Power Backup', 'Club House'],
                images: [
                    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
                    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
                ],
                availability: true,
                ownerId: owner._id
            }
        ];

        await Property.insertMany(sampleProperties);

        console.log('✅ Sample data seeded successfully!');
        console.log(`📊 Created ${sampleProperties.length} properties`);
        console.log('\n📝 Sample Owner Credentials:');
        console.log('   Email: owner@househunt.com');
        console.log('   Password: owner123');
        console.log('   Status: Approved ✅\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
