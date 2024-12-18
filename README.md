# UPT Attendance Mobile App

## Description
The UPT Attendance mobile application is designed to streamline the process of managing and justifying student absences at Universidad Privada de Tacna. This mobile solution allows students to:

- Submit absence justifications digitally
- Track attendance in real-time
- Receive instant notifications about their attendance status
- View attendance history by course
- Upload supporting documentation for absences

## Features
- Digital absence justification system
- Real-time attendance tracking
- Push notifications for updates
- Document upload functionality
- Attendance history visualization
- Offline mode support
- Biometric authentication

## Technical Requirements
- Flutter SDK
- Android Studio / Xcode
- Minimum SDK:
  - Android: API level 21 (Android 8.0) or higher
  - iOS: iOS 12.0 or higher
- Device with:
  - 2GB RAM minimum
  - 100MB free storage
  - Camera access for document scanning
  - Internet connection

## Installation Guide

### 1. Environment Setup

First, ensure you have Flutter installed on your system:

```bash
# Check if Flutter is installed
flutter --version

# If not installed, follow these steps:
git clone https://github.com/flutter/flutter.git
export PATH="$PATH:`pwd`/flutter/bin"    # Add to your path
flutter doctor                           # Verify installation
```

### 2. Project Setup

```bash
# Clone the repository
git clone https://github.com/your-repo/upt-attendance-mobile.git

# Navigate to project directory
cd upt-attendance-mobile

# Install dependencies
flutter pub get
```

### 3. Configuration

Create a `config.dart` file in `lib/config/`:

```dart
class AppConfig {
  static const String apiUrl = 'YOUR_API_URL';
  static const String appName = 'UPT Attendance';
  
  // API endpoints
  static const String loginEndpoint = '/auth/login';
  static const String attendanceEndpoint = '/attendance';
  static const String justificationEndpoint = '/justification';
}
```

### 4. Firebase Setup

1. Create a Firebase project
2. Add your Android/iOS app in Firebase console
3. Download and add the configuration files:
   - Android: `google-services.json` to `android/app/`
   - iOS: `GoogleService-Info.plist` to `ios/Runner/`

### 5. Running the Application

```bash
# For development
flutter run

# Build APK
flutter build apk

# Build iOS
flutter build ios
```

## Project Structure
```
lib/
├── config/             # Configuration files
├── models/            # Data models
├── screens/           # UI screens
│   ├── auth/         # Authentication screens
│   ├── home/         # Main screens
│   └── justification/ # Justification screens
├── services/          # API services
├── utils/            # Utility functions
└── widgets/          # Reusable widgets
```

## Troubleshooting

Common issues and solutions:

1. **Build Errors**
   ```bash
   flutter clean
   flutter pub get
   flutter run
   ```

2. **Firebase Integration Issues**
   - Verify Google Services files are in correct locations
   - Ensure package name matches Firebase configuration
   - Check build.gradle for correct dependencies

3. **API Connection Issues**
   - Verify API URL in config file
   - Check internet connection
   - Verify API endpoints are accessible

## Development Commands

```bash
# Run tests
flutter test

# Check code format
flutter format .

# Analyze project
flutter analyze

# Generate APK
flutter build apk --release

# Generate iOS build
flutter build ios --release
```

## Contributing
Please follow these steps for contributing:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support
For support and queries:
- Contact the development team at [email]
- Check documentation at [docs_url]
- Report issues in the project repository

## Team
- César Fabián Chávez Linares (2019063854)
- Cristian Aldair Quispe Levano (2018000590)
- Javier André Neira Machaca (2017057984)
- Delgado Castillo, Jesús Ángel (2018000491)

## License
This project is proprietary software developed for Universidad Privada de Tacna. All rights reserved.
