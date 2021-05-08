#!/bin/bash
set -eo pipefail
rm -rf package
rm -rf numpypandas
rm -rf sklearn
cd function
echo "creating dependencies layer"
pip install --target ../package/python -r requirements.txt
rm -r ../package/python/__pycache__
echo "creating pandas and numpy layer"
cd ..
mkdir -p numpypandas/python
cd numpypandas/python
cp ../../deps-1/*.whl .
unzip '*.whl'
rm -r *.whl *.dist-info
echo "creating sklearn layer"
cd ../..
mkdir -p sklearn/python
cd sklearn/python
cp ../../deps-2/*.whl .
unzip '*.whl'
pip install --target . joblib threadpoolctl
rm -r *.whl *.dist-info __pycache__
