#!/usr/bin/env python

import sys
import json
import yaml

print(yaml.dump(json.load(open(sys.argv[1])), default_flow_style=False))