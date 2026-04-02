#!/bin/bash

##############################################################################
# Local Environment Setup Script
# This script checks for the availability of Node.js, npm, and Java.
# If any are missing, it prompts for version preference and installs them.
##############################################################################

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Detect OS
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            if [ "$ID" = "ubuntu" ] || [ "$ID" = "debian" ]; then
                echo "debian"
            elif [ "$ID" = "fedora" ] || [ "$ID" = "rhel" ] || [ "$ID" = "centos" ]; then
                echo "fedora"
            else
                echo "linux"
            fi
        else
            echo "linux"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        echo "windows"
    else
        echo "unknown"
    fi
}

# Install using appropriate package manager
install_with_package_manager() {
    local package=$1
    local os=$2

    case $os in
        macos)
            if ! command -v brew &> /dev/null; then
                print_error "Homebrew not found on macOS. Please install Homebrew first:"
                echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
                exit 1
            fi
            print_info "Installing $package via Homebrew..."
            brew install $package
            ;;
        debian)
            print_info "Installing $package via apt..."
            sudo apt-get update
            sudo apt-get install -y $package
            ;;
        fedora)
            print_info "Installing $package via dnf..."
            sudo dnf install -y $package
            ;;
        *)
            print_error "Unsupported OS or package manager for automatic installation"
            return 1
            ;;
    esac
}

# Check and install Node.js
check_node() {
    print_header "Checking Node.js"

    if command -v node &> /dev/null; then
        local node_version=$(node -v)
        print_success "Node.js is installed: $node_version"
        return 0
    else
        print_warning "Node.js is not installed"
        read -p "Do you want to install Node.js? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            read -p "Enter Node.js version to install (e.g., 18, 20, lts, or latest) [default: lts]: " node_version
            node_version=${node_version:-lts}

            local os=$(detect_os)
            if [ "$os" = "macos" ]; then
                print_info "Installing Node.js $node_version via Homebrew..."
                if [ "$node_version" = "lts" ] || [ "$node_version" = "latest" ]; then
                    brew install node
                else
                    brew install node@$node_version
                    brew link node@$node_version --force
                fi
            else
                install_with_package_manager "nodejs" "$os"
            fi

            if command -v node &> /dev/null; then
                print_success "Node.js installed successfully: $(node -v)"
            else
                print_error "Failed to install Node.js"
                return 1
            fi
        else
            print_warning "Skipping Node.js installation"
        fi
    fi
}

# Check and install npm
check_npm() {
    print_header "Checking npm"

    if command -v npm &> /dev/null; then
        local npm_version=$(npm -v)
        print_success "npm is installed: $npm_version"
        return 0
    else
        print_warning "npm is not installed"
        read -p "Do you want to install npm? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            read -p "Enter npm version to install (e.g., 9, 10, latest, or 'with-node' to install with Node.js) [default: with-node]: " npm_version
            npm_version=${npm_version:-with-node}

            if [ "$npm_version" = "with-node" ]; then
                print_info "npm will be installed with Node.js"
                # npm comes bundled with node, so just ensure node is installed
                if ! command -v npm &> /dev/null; then
                    check_node
                fi
            else
                local os=$(detect_os)
                if [ "$os" = "macos" ]; then
                    print_info "Installing npm $npm_version via Homebrew..."
                    brew install npm@$npm_version || brew install npm
                else
                    install_with_package_manager "npm" "$os"
                fi
            fi

            if command -v npm &> /dev/null; then
                print_success "npm installed successfully: $(npm -v)"
            else
                print_error "Failed to install npm"
                return 1
            fi
        else
            print_warning "Skipping npm installation"
        fi
    fi
}

# Check and install Java
check_java() {
    print_header "Checking Java"

    if command -v java &> /dev/null; then
        local java_version=$(java -version 2>&1 | head -n 1)
        print_success "Java is installed: $java_version"
        return 0
    else
        print_warning "Java is not installed"
        read -p "Do you want to install Java? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            read -p "Enter Java version to install (e.g., 11, 17, 21, or lts) [default: 21]: " java_version
            java_version=${java_version:-21}

            local os=$(detect_os)
            if [ "$os" = "macos" ]; then
                print_info "Installing Java $java_version via Homebrew..."
                if [ "$java_version" = "lts" ]; then
                    brew install openjdk@21
                    sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk
                else
                    brew install openjdk@$java_version
                    sudo ln -sfn /opt/homebrew/opt/openjdk@$java_version/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-$java_version.jdk
                fi
            else
                install_with_package_manager "openjdk-$java_version-jdk" "$os"
            fi

            if command -v java &> /dev/null; then
                print_success "Java installed successfully: $(java -version 2>&1 | head -n 1)"
            else
                print_error "Failed to install Java"
                return 1
            fi
        else
            print_warning "Skipping Java installation"
        fi
    fi
}

# Main execution
main() {
    print_header "Local Environment Setup"
    echo

    local os=$(detect_os)
    print_info "Detected OS: $os"
    echo

    # Check each tool
    check_node
    echo
    check_npm
    echo
    check_java
    echo

    print_header "Setup Complete"
    print_success "Environment setup finished!"
    echo
    print_info "Final Versions:"
    if command -v node &> /dev/null; then
        echo "  Node.js: $(node -v)"
    fi
    if command -v npm &> /dev/null; then
        echo "  npm: $(npm -v)"
    fi
    if command -v java &> /dev/null; then
        echo "  Java: $(java -version 2>&1 | head -n 1)"
    fi
    echo
    print_info "Next steps:"
    echo "  1. Navigate to backend directory: cd backend"
    echo "  2. Build the project: mvn clean package"
    echo "  3. Navigate to frontend directory: cd ../frontend"
    echo "  4. Install dependencies: npm install"
    echo "  5. Run the application: See README.md for details"
}

# Run main function
main
