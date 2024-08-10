from setuptools import setup, find_packages

setup(
    name="pptx-generator",
    version="0.1",
    packages=find_packages(),
    include_package_data=True,  # Include package data
    package_data={
        # Include any .pptx files found within any package's "data" directory
        'app': ['data/*.pptx', 'data/*.yml'],
    },
    install_requires=[
        'python-pptx',  # Required for working with PowerPoint files
        'pyyaml',       # Required for YAML file operations
        'rich',
        'flask',
        # 'textual',
    ],
    entry_points={
        'console_scripts': [
            'pptx-generator=app.pptx_generator:main',  # Creates a command named 'my-app' that calls the main function in my_app/main.py
            'pptx-generator-search=app.pptx_generator:search',
            'pptx-generator-debug=app.pptx_generator:debug',
        ],
    },
    python_requires='>=3.7',
)