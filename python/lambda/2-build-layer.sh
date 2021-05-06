#!/bin/bash
set -eo pipefail
rm -rf package
cd function
pip install --target ../package/python -r requirements.txt
cd ../package/python
cp ../../deps/*.whl .
unzip '*.whl'
rm -r *.whl *.dist-info __pycache__