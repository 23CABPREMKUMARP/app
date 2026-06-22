import json

transcript_path = "/Users/premkumar/.gemini/antigravity/brain/e64cd8ed-7ee4-4367-9e64-0ec0d78c6a89/.system_generated/logs/transcript_full.jsonl"
target_file = "/Users/premkumar/Downloads/webpage of jeff ben copy 2/app/admin/town-bus/page.tsx"

best_content = None
max_len = 0

with open(transcript_path, 'r') as f:
    for line in f:
        try:
            entry = json.loads(line)
        except:
            continue
            
        if 'tool_calls' in entry:
            for tc in entry['tool_calls']:
                if tc['name'] == 'default_api:write_to_file':
                    args = tc.get('arguments', {})
                    if args.get('TargetFile') == target_file:
                        content = args.get('CodeContent', '')
                        if len(content) > max_len:
                            max_len = len(content)
                            best_content = content
        
        # Also check view_file outputs
        if entry.get('type') == 'TOOL_RESPONSE':
            # This is harder to parse from the raw JSON, let's stick to tool_calls first
            pass

if best_content:
    print(f"Found content of length {len(best_content)}!")
    with open("recovered_admin_page.tsx", "w") as out:
        out.write(best_content)
else:
    print("No write_to_file found for that file.")
