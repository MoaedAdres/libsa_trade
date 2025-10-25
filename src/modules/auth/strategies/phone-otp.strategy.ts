import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { AuthService } from '../auth.service';

@Injectable()
export class PhoneOtpStrategy extends PassportStrategy(Strategy, 'phone-otp') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: any): Promise<any> {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      throw new UnauthorizedException('Phone and OTP are required');
    }

    const user = await this.authService.validatePhoneOtp(phone, otp);
    if (!user) {
      throw new UnauthorizedException('Invalid OTP or expired');
    }

    return user;
  }
}
