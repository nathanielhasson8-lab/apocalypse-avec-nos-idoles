project('manager27', 'c', version: '1.0.0')

gtk = dependency('gtk4')
webkit = dependency('webkitgtk-6.0')

executable('manager27', 'manager27.c', dependencies: [gtk, webkit], install: true)
install_data('index.html', install_dir: get_option('datadir') / 'manager27')
install_data('com.manager27.MSN.desktop', install_dir: get_option('datadir') / 'applications')
install_data('com.manager27.MSN.svg', install_dir: get_option('datadir') / 'icons/hicolor/scalable/apps')
install_data('com.manager27.MSN.metainfo.xml', install_dir: get_option('datadir') / 'metainfo')
