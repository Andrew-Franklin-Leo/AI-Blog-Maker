# Application Sequence Diagrams

## User Content Generation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Frontend UI
    participant OR as OpenRouter AI
    participant DB as Supabase DB

    U->>UI: Request New Blog Post
    UI->>OR: Send Content Parameters
    OR-->>UI: Return AI Generated Content
    U->>UI: Edit/Approve Content
    UI->>DB: Save Blog Post
    DB-->>UI: Confirm Save
    UI-->>U: Show Success Message

```

## Content Retrieval Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Frontend UI
    participant DB as Supabase DB
    participant Cache as Browser Cache

    U->>UI: Request Blog Posts
    UI->>Cache: Check Cached Data
    alt Cache Hit
        Cache-->>UI: Return Cached Data
        UI-->>U: Display Posts
    else Cache Miss
        UI->>DB: Fetch Posts
        DB-->>UI: Return Posts
        UI->>Cache: Update Cache
        UI-->>U: Display Posts
    end
```

## Data Flow Considerations

1. **Client-Side Processing**
   - All AI processing happens through direct OpenRouter API calls
   - No server-side processing required
   - Content validation and sanitization on client

2. **Data Persistence**
   - Immediate local cache updates
   - Optimistic UI updates
   - Background sync with Supabase

3. **Error Handling**
   - Retry logic for failed API calls
   - Offline support through caching
   - Graceful degradation if AI service unavailable

4. **Security Flow**
   - API keys stored in environment variables
   - Row Level Security in Supabase
   - Content validation before storage

This diagram illustrates the key interactions and data flows in the system, highlighting the stateless nature of the SPA architecture and the integration points between different services.