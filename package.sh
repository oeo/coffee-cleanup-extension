#!/bin/bash

# Clean previous builds
rm -rf dist
rm -f *.vsix

# Compile the extension
yarn compile

# Package the extension
yarn package

# List files to verify
ls -l *.vsix

# vim: set ts=2 sw=2 et
