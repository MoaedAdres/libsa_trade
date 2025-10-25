import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface CommissionCalculation {
  platformFee: number;
  supplierReceives: number;
  commissionRate: number;
}

@Injectable()
export class CommissionService {
  constructor(private configService: ConfigService) {}

  async calculateCommission(
    transactionType: 'rental' | 'sale' | 'consignment',
    amount: number,
    supplierTier: 'free' | 'premium' | 'enterprise' = 'free',
  ): Promise<CommissionCalculation> {
    // Get commission rates from configuration
    const rentalRate = this.configService.get('app.commission.rental', 12);
    const saleRate = this.configService.get('app.commission.sale', 8);
    const consignmentRate = this.configService.get('app.commission.consignment', 18);

    // Apply tier-based discounts
    const tierDiscount = this.getTierDiscount(supplierTier);

    let baseRate: number;
    switch (transactionType) {
      case 'rental':
        baseRate = rentalRate;
        break;
      case 'sale':
        baseRate = saleRate;
        break;
      case 'consignment':
        baseRate = consignmentRate;
        break;
      default:
        baseRate = rentalRate;
    }

    // Apply tier discount
    const finalRate = baseRate * (1 - tierDiscount);
    const platformFee = (amount * finalRate) / 100;
    const supplierReceives = amount - platformFee;

    return {
      platformFee: Math.round(platformFee * 100) / 100,
      supplierReceives: Math.round(supplierReceives * 100) / 100,
      commissionRate: finalRate,
    };
  }

  private getTierDiscount(tier: string): number {
    switch (tier) {
      case 'premium':
        return 0.2; // 20% discount
      case 'enterprise':
        return 0.4; // 40% discount
      default:
        return 0; // No discount for free tier
    }
  }

  async calculatePayout(
    grossAmount: number,
    penalties: number = 0,
    supplierTier: 'free' | 'premium' | 'enterprise' = 'free',
  ): Promise<CommissionCalculation> {
    // For payouts, we calculate the platform fee based on the gross amount
    const commission = await this.calculateCommission('rental', grossAmount, supplierTier);
    
    const netAmount = commission.supplierReceives - penalties;
    
    return {
      platformFee: commission.platformFee,
      supplierReceives: Math.max(0, netAmount), // Ensure non-negative
      commissionRate: commission.commissionRate,
    };
  }
}
