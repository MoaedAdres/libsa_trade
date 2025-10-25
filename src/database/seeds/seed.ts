import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { PhotoRequirement } from '../../modules/photo-requirements/entities/photo-requirement.entity';
import { User } from '../../modules/users/entities/user.entity';
import { UserRole } from '../../common/enums';
import * as bcrypt from 'bcrypt';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('🌱 Starting database seeding...');

    // Seed photo requirements
    const photoRequirementsRepository = AppDataSource.getRepository(PhotoRequirement);
    
    const photoRequirements = [
      {
        stage: 'item_intake',
        requiredFileTypes: ['image'],
        minimumCount: 3,
        maximumCount: 10,
        mandatory: true,
        qualityThreshold: 0.7,
        description: 'Photos required for item intake process',
      },
      {
        stage: 'item_listing',
        requiredFileTypes: ['image'],
        minimumCount: 5,
        maximumCount: 15,
        mandatory: true,
        qualityThreshold: 0.8,
        description: 'High-quality photos for item listings',
      },
      {
        stage: 'booking_pickup',
        requiredFileTypes: ['image'],
        minimumCount: 2,
        maximumCount: 5,
        mandatory: true,
        qualityThreshold: 0.6,
        description: 'Photos taken during item pickup',
      },
      {
        stage: 'booking_return',
        requiredFileTypes: ['image'],
        minimumCount: 2,
        maximumCount: 5,
        mandatory: true,
        qualityThreshold: 0.6,
        description: 'Photos taken during item return',
      },
      {
        stage: 'dispute_evidence',
        requiredFileTypes: ['image'],
        minimumCount: 1,
        maximumCount: 10,
        mandatory: true,
        qualityThreshold: 0.5,
        description: 'Evidence photos for disputes',
      },
      {
        stage: 'consignment_agreement',
        requiredFileTypes: ['document'],
        minimumCount: 1,
        maximumCount: 1,
        mandatory: true,
        qualityThreshold: 0.8,
        description: 'Signed consignment agreement document',
      },
      {
        stage: 'consignment_id_scan',
        requiredFileTypes: ['image'],
        minimumCount: 1,
        maximumCount: 2,
        mandatory: true,
        qualityThreshold: 0.7,
        description: 'ID document scan for consignment',
      },
    ];

    for (const requirement of photoRequirements) {
      const existing = await photoRequirementsRepository.findOne({
        where: { stage: requirement.stage },
      });

      if (!existing) {
        await photoRequirementsRepository.save(requirement);
        console.log(`✅ Created photo requirement for stage: ${requirement.stage}`);
      } else {
        console.log(`⏭️  Photo requirement for stage ${requirement.stage} already exists`);
      }
    }

    // Seed admin user
    const userRepository = AppDataSource.getRepository(User);
    
    const adminEmail = 'admin@libsahub.com';
    const existingAdmin = await userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const adminUser = userRepository.create({
        email: adminEmail,
        passwordHash: hashedPassword,
        name: 'LibsaHub Admin',
        role: UserRole.ADMIN,
        isEmailVerified: true,
        isPhoneVerified: true,
      });

      await userRepository.save(adminUser);
      console.log(`✅ Created admin user: ${adminEmail}`);
    } else {
      console.log(`⏭️  Admin user already exists: ${adminEmail}`);
    }

    // Seed test users
    const testUsers = [
      {
        email: 'customer@libsahub.com',
        name: 'Test Customer',
        role: UserRole.CUSTOMER,
      },
      {
        email: 'supplier@libsahub.com',
        name: 'Test Supplier',
        role: UserRole.SUPPLIER,
      },
    ];

    for (const userData of testUsers) {
      const existing = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (!existing) {
        const hashedPassword = await bcrypt.hash('password123', 12);
        const user = userRepository.create({
          ...userData,
          passwordHash: hashedPassword,
          isEmailVerified: true,
        });

        await userRepository.save(user);
        console.log(`✅ Created test user: ${userData.email}`);
      } else {
        console.log(`⏭️  Test user already exists: ${userData.email}`);
      }
    }

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();
