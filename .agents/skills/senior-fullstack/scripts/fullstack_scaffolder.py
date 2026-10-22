import os
import sys
import argparse

def main():
    parser = argparse.ArgumentParser(description="Senior Fullstack - Fullstack Scaffolder")
    parser.add_argument("project_path", help="Path to the project to scaffold")
    parser.add_argument("--template", help="Template to use (e.g., nextjs-prisma, express-graphql)", default="nextjs-prisma")
    
    args = parser.parse_args()
    
    print(f"🚀 Scaffolding new fullstack project at: {args.project_path}")
    print(f"📦 Using template: {args.template}")
    
    # Logic for scaffolding would go here
    # 1. Create directory structure
    # 2. Initialize package.json
    # 3. Setup TypeScript/Linting
    # 4. Create base components
    
    print("\n✅ Scaffolding complete!")
    print("Next steps:")
    print(f"1. cd {args.project_path}")
    print("2. npm install")
    print("3. npm run dev")

if __name__ == "__main__":
    main()
