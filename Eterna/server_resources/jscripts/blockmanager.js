// Generated by CoffeeScript 1.3.3
(function() {

  this.BlockManager = {
    blocks_: null,
    pageblocks_: null,
    anonymous_block_counter_: 0,
    add_blocks: function(template) {
      var bb, begins_N, begins_walker, block, block_begin_index, block_begin_indices, block_begin_walker, block_end_index, block_end_indices, block_end_walker, block_name, block_template, child, children, ends_N, ends_walker, header, header_match, header_vars, ii, jj, match, match_stack, matches, new_template, offset, parent, template_walker, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3, _results,
        _this = this;
      template = template.replace(/[\r\n]/g, "");
      template = template.replace(/<block[^>]*>/g, function(match) {
        if (/name\s*=\s*"[^"]+"/i.exec(match)) {
          return match;
        }
        _this.anonymous_block_counter_++;
        return match.substring(match, match.length - 1) + " name=\"block-temp-name-" + _this.anonymous_block_counter_ + "\">";
      });
      block_begin_indices = new Array();
      block_begin_walker = 0;
      while ((block_begin_index = template.indexOf("<block", block_begin_walker)) >= 0) {
        block_begin_indices.push(block_begin_index);
        block_begin_walker = block_begin_index + 6;
      }
      block_end_indices = new Array();
      block_end_walker = 0;
      while ((block_end_index = template.indexOf("</block>", block_end_walker)) >= 0) {
        block_end_indices.push(block_end_index);
        block_end_walker = block_end_index + 8;
      }
      begins_walker = 0;
      begins_N = block_begin_indices.length;
      ends_walker = 0;
      ends_N = block_end_indices.length;
      if (begins_N !== ends_N) {
        Utils.display_error("Unmatched <block> and </blocks>");
        return;
      }
      match_stack = new Array();
      matches = new Array();
      parent = null;
      while (begins_walker < begins_N || ends_walker < ends_N) {
        block_begin_index = block_begin_indices[begins_walker];
        block_end_index = block_end_indices[ends_walker];
        if (begins_walker < begins_N && block_begin_index < block_end_index) {
          match = {
            "begin_header": block_begin_index,
            "end": -1,
            children: []
          };
          match_stack.push(match);
          begins_walker++;
        } else {
          match = match_stack.pop();
          match['end'] = block_end_index;
          block_template = template.substring(match['begin_header'], match['end']);
          header_match = /<block[^>]*>/.exec(block_template);
          if (!(header_match != null)) {
            Utils.display_error("Unclosed block bracket");
            return;
          }
          header = String(header_match);
          match['header'] = ThemeCompiler.get_attrs(header);
          match['begin'] = match['begin_header'] + header.length;
          match['template'] = block_template.substring(header.length);
          if (match_stack.length > 0) {
            match_stack.last().children.push(match);
          }
          matches.push(match);
          ends_walker++;
        }
      }
      if (!(this.blocks_ != null)) {
        this.blocks_ = new Array();
        this.pageblocks_ = new Array();
      }
      _results = [];
      for (ii = _i = 0, _ref = matches.length - 1; _i <= _ref; ii = _i += 1) {
        match = matches[ii];
        if (Utils.is_text_empty(match['template'])) {
          continue;
        }
        if (match.children.length > 0) {
          children = match.children;
          template_walker = 0;
          new_template = new Array();
          offset = match['begin'];
          for (jj = _j = 0, _ref1 = children.length - 1; _j <= _ref1; jj = _j += 1) {
            child = children[jj];
            if (child['header']['defonly']) {
              new_template.push(match['template'].substring(template_walker, child['begin_header'] - offset));
              template_walker = child['end'] + 8 - offset;
            } else {
              new_template.push(match['template'].substring(template_walker, child['begin'] - offset));
              template_walker = child['end'] - offset;
            }
          }
          new_template.push(match['template'].substring(template_walker, match['end'] - offset));
          match['template'] = new_template.join('');
        }
        header_vars = match['header'];
        block_name = header_vars['name'];
        block = new Block(header_vars, match['template']);
        if (this.get_block(block_name) != null) {
          for (bb = _k = 0, _ref2 = this.blocks_.length - 1; _k <= _ref2; bb = _k += 1) {
            if (this.blocks_[bb].name_ === block_name) {
              this.blocks_[bb] = block;
            }
          }
          for (bb = _l = 0, _ref3 = this.pageblocks_.length - 1; _l <= _ref3; bb = _l += 1) {
            if (this.pageblocks_[bb].name_ === block_name) {
              this.pageblocks_[bb] = block;
            }
          }
        } else {
          this.blocks_.push(block);
        }
        if (header_vars['url'] != null) {
          _results.push(this.pageblocks_.push(block));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    get_block: function(name) {
      var ii, _i, _ref;
      for (ii = _i = 0, _ref = this.blocks_.length - 1; _i <= _ref; ii = _i += 1) {
        if (this.blocks_[ii].name_ === name) {
          return this.blocks_[ii];
        }
      }
    },
    get_pageblock: function(uri, params) {
      var ii, _i, _ref;
      for (ii = _i = 0, _ref = this.pageblocks_.length - 1; _i <= _ref; ii = _i += 1) {
        if (this.pageblocks_[ii].match_uri_and_fill_parameters(uri, params)) {
          return this.pageblocks_[ii];
        }
      }
      return null;
    }
  };

  this.Blocks = function(block_name) {
    return BlockManager.get_block(block_name);
  };

}).call(this);
