"""
Waste category definitions and disposal guidance.
"""

WASTE_CATEGORIES = {
    "plastic": {
        "name": "Plastic",
        "guidance": "Place in blue recycling bin. Remove caps and rinse bottles before recycling. Avoid plastic bags in bins.",
        "is_recyclable": True,
        "color": "#3498DB",  # Blue
        "tips": [
            "Remove lids and caps",
            "Rinse containers",
            "No plastic bags in recycling",
            "Flatten for space efficiency"
        ]
    },
    "glass": {
        "name": "Glass",
        "guidance": "Place in glass recycling bin. Keep glass separate from other waste. Rinse before disposal.",
        "is_recyclable": True,
        "color": "#95A5A6",  # Gray
        "tips": [
            "Separate from other waste",
            "Rinse containers",
            "Avoid mixing colors if possible",
            "Handle carefully to prevent cuts"
        ]
    },
    "metal": {
        "name": "Metal/Aluminum",
        "guidance": "Highly recyclable! Place aluminum cans in recycling bin. Metal has great reuse value.",
        "is_recyclable": True,
        "color": "#C0C0C0",  # Silver
        "tips": [
            "Aluminum cans are highly valuable",
            "Rinse before recycling",
            "Crush to save space",
            "Separate aluminum from steel if possible"
        ]
    },
    "paper": {
        "name": "Paper",
        "guidance": "Recyclable if clean and dry. Place in paper recycling bin. Avoid oily or wet paper.",
        "is_recyclable": True,
        "color": "#E8E8E8",  # Light gray
        "tips": [
            "Keep paper dry",
            "Avoid oily or contaminated paper",
            "Remove plastic windows from envelopes",
            "Flatten to save space"
        ]
    },
    "cardboard": {
        "name": "Cardboard",
        "guidance": "Highly recyclable! Flatten boxes and place in cardboard recycling. Great source for packaging.",
        "is_recyclable": True,
        "color": "#D2B48C",  # Tan
        "tips": [
            "Flatten boxes",
            "Remove non-cardboard contents",
            "Keep dry",
            "Bundle with twine if large"
        ]
    },
    "food_waste": {
        "name": "Food Waste",
        "guidance": "Place in composting bin or special food waste collection. Some regions have industrial composting programs.",
        "is_recyclable": False,
        "color": "#8B4513",  # Brown
        "tips": [
            "Use composting bin if available",
            "Check local composting programs",
            "Includes: fruit, vegetables, food scraps",
            "Separate from packaging"
        ]
    },
    "battery": {
        "name": "Battery",
        "guidance": "⚠️ HAZARDOUS! Take to battery recycling center. Never throw in regular trash or recycling.",
        "is_recyclable": True,
        "color": "#FF0000",  # Red
        "tips": [
            "NEVER put in regular trash",
            "Find local battery recycling center",
            "Cover terminals with tape if possible",
            "Store in dry place away from children"
        ]
    },
    "e_waste": {
        "name": "Electronic Waste",
        "guidance": "⚠️ HAZARDOUS! Take to e-waste facility. Contains toxic materials. Never throw in trash.",
        "is_recyclable": True,
        "color": "#FF6B6B",  # Bright red
        "tips": [
            "Never put in regular waste",
            "Find certified e-waste recycler",
            "Data wipe recommended before recycling",
            "Check manufacturer take-back programs"
        ]
    },
    "textile": {
        "name": "Textile/Clothing",
        "guidance": "Reuse or donate if usable. Textile recycling programs are less common but growing.",
        "is_recyclable": True,
        "color": "#9B59B6",  # Purple
        "tips": [
            "Donate to charity if in good condition",
            "Check for textile recycling programs",
            "Reuse for rags or crafts",
            "Avoid mixing with other waste"
        ]
    },
    "medical_waste": {
        "name": "Medical Waste",
        "guidance": "⚠️ HAZARDOUS! Contact healthcare facility or hazardous waste center. Do not handle casually.",
        "is_recyclable": False,
        "color": "#FF1744",  # Dark red
        "tips": [
            "Do NOT touch with bare hands",
            "Wear gloves when handling",
            "Contact medical facility",
            "Use biohazard containers if available"
        ]
    }
}

def get_category_info(category_name: str) -> dict:
    """Get detailed information about a waste category."""
    return WASTE_CATEGORIES.get(category_name.lower(), {
        "name": "Unknown",
        "guidance": "Please consult local waste management guidelines.",
        "is_recyclable": False,
        "color": "#95A5A6",
        "tips": ["Contact local authorities for guidance"]
    })
