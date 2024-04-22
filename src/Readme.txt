|-- /src                       # Source files for your app
|   |-- /assets                # Static assets (images, fonts, etc.)
|   |-- /components            # Reusable components
|   |   |-- /common            # Highly reusable across the app (e.g., buttons, cards)
|   |   `-- /features          # Feature-specific components (e.g., PostCard, ProfileView)
|   |-- /config                # Configuration files (e.g., Firebase config)
|   |-- /constants             # Constant values (e.g., colors, route names)
|   |-- /navigation            # Navigation setup (e.g., stack, tab navigators)
|   |-- /screens               # Screen components
|   |   |-- /Home              # Home screen
|   |   |-- /Profile           # Profile screen
|   |   `-- /PostDetail        # Detailed view of a post
|   |-- /services              # Services for external interactions
|   |   |-- /firebase          # Firebase service (auth, database queries)
|   |   `-- /ai                # AI matching logic or external AI service integration
|   |-- /hooks                 # Custom hooks (e.g., useAuth, useFirestore)
|   |-- /store                 # State management (e.g., Redux, Context API)
|   |   |-- /actions           # Action creators
|   |   |-- /reducers          # Reducers
|   |   `-- /types             # Action type constants
|   `-- /utils                 # Utility functions