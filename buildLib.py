import os
import json


def createPath():
    gamePath = ''
    with open('./package.json', 'r', encoding='utf-8') as f:
        packageJson = json.loads(f.read())
        gameName = packageJson['name']
        gameVersion = packageJson['version']
        gamePath = f'./dist/{gameName} {gameVersion}'
    # if not os.path.exists(f'{gamePath}'):
    #     os.mkdir(f'{gamePath}')
    #     if not os.path.exists(f'{gamePath}/assets'):
    #         os.mkdir(f'{gamePath}/assets')
    #         if not os.path.exists(f'{gamePath}/assets/js'):
    #             os.mkdir(f'{gamePath}/assets/js')
    return f'{gamePath}/assets/js/'

def start():
    cli = 'npx vue-cli-service'
    cliParams = 'build --no-clean --target lib --mode special --formats umd-min --dest'
    inputPath = './src/components/Special/'
    outputPath = './dist/SpecialLibrary/'
    gamePath = createPath()
    processList = []
    for filename in os.listdir(inputPath):
        if (filename.endswith(".vue")):
            print(f'Processing: {filename}')
            filenameWithoutExt = filename[0 : filename.find(".vue")]
            if (os.path.isfile(f'{outputPath}{filenameWithoutExt}.js')):
                os.remove(f'{outputPath}{filenameWithoutExt}.js')
            os.system(f'{cli} {cliParams} {outputPath} {inputPath}{filename}')
            os.rename(f'{outputPath}lab.umd.min.js', f'{gamePath}{filenameWithoutExt}.js')
            processList.append(filename)
        else:
            continue
        print(f'Done! {len(processList)} files processing: {processList}')

try:
    print('Starting building library...')
    start()
except Exception as err:
    print("Exception occurred: ")
    raise
except KeyboardInterrupt:
    print('The building library was forcibly stopped by user (Ctlr + C)')